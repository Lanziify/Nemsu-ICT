const admin = require("../config/firebase-admin-config");
const asyncHandler = require("express-async-handler");

// firestore collection references
const db = admin.firestore();
const usersRef = db.collection("users");
const requestsRef = db.collection("requests");
const notificationRef = db.collection("notifications");

// Add user to firebase authentication
// and creates a user document on the firestore db
const createUser = asyncHandler(async (name, position, email, password) => {
  const user = await admin.auth().createUser({
    email,
    password,
  });

  const userData = {
    admin: false,
    uid: user.uid,
    fcmToken: "",
    name: name,
    position: position,
    email: user.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await admin.auth().setCustomUserClaims(user.uid, { admin: userData.admin });

  const userDocRef = usersRef.doc(user.uid);
  await userDocRef.set({ ...userData });
  // Return true to indicate success
});

// get all registered users
const getAllUsers = asyncHandler(async () => {
  const snapshot = await usersRef.where("admin", "==", false).get();
  const users = [];

  snapshot.forEach((doc) => {
    users.push(doc.data());
  });

  return users;
});
// Updates user role using their uid
const setAdmin = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    await usersRef.doc(uid).update({ admin: true });
  } catch (error) {
    console.error("Error setting admin claims:", error);
  }
};
// store users' repair requisition to firestore
// and creates a notification document using the data argument
// then fires the notification on the admins' interface/background
const createRequest = asyncHandler(async ({ data }) => {
  const userDoc = (await usersRef.where("uid", "==", data.uid).limit(1).get())
    .docs[0];
  const adminDoc = (await usersRef.where("admin", "==", true).limit(1).get())
    .docs[0];

  const userSnapshot = userDoc.data();
  const adminSnapshot = adminDoc.data();

  const requestDocRef = requestsRef.doc();
  const notificationDocRef = notificationRef.doc();

  const request = {
    ...data,
    requestId: requestDocRef.id,
    name: userSnapshot.name,
    position: userSnapshot.position,
    email: userSnapshot.email,
    status: "Pending",
    updatedAt: null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const notification = {
    notificationId: notificationDocRef.id,
    senderId: data.uid,
    senderName: userSnapshot.name,
    receiverId: adminSnapshot.uid,
    title: `Incoming Request`,
    body: `You've got a new repair request from ${userSnapshot.name}. Check it out now to review and respond promptly.`,
    data: { ...data },
    read: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const payload = {
    token: adminSnapshot.fcmToken,
    data: {
      title: `Incoming Request`,
      subtitle: `You've got a new repair request from ${userSnapshot.name}. Check it out now to review and respond promptly.`,
      messageId: notificationDocRef.id,
    },
  };

  await requestDocRef.set(request);
  await notificationDocRef.set(notification);
  await admin.messaging().send(payload);
});
// respond to users request
const respondUserRequest = asyncHandler(async (requesId, status) => {
  const requestDoc = (
    await requestsRef.where("requestId", "==", requesId).get()
  ).docs[0];
  const requestSnapshot = requestDoc.data();

  const userDoc = (await usersRef.where("uid", "==", requestSnapshot.uid).get())
    .docs[0];
  const userSnapshot = userDoc.data();

  const adminDoc = (await usersRef.where("admin", "==", true).limit(1).get())
    .docs[0];
  const adminSnapshot = adminDoc.data();

  const notificationDocRef = notificationRef.doc();

  let notificationTitle = "";
  let notificationMessage = "";

  if (status == "Accepted") {
    notificationTitle = "Request Accepted";
    notificationMessage = `Your requisition request #${notificationDocRef.id} has been approved and is now being processed. We're working on fulfilling it. Thank you for your patience.`;
  } else if (status == "Canceled") {
    notificationTitle = "Request Canceled";
    notificationMessage = `We're sorry to inform you that your requisition request #${notificationDocRef.id} has been canceled.  If you have any concerns, feel free to reach out to us.`;
  }

  const notification = {
    notificationId: notificationDocRef.id,
    senderId: adminSnapshot.uid,
    senderName: adminSnapshot.name,
    receiverId: userSnapshot.uid,
    title: notificationTitle,
    body: notificationMessage,
    // data: { ...data },
    read: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const payload = {
    token: userSnapshot.fcmToken,
    data: {
      title: notificationTitle,
      subtitle: notificationMessage,
      messageId: notificationDocRef.id,
    },
  };

  await notificationDocRef.set(notification);
  await requestsRef
    .doc(requesId)
    .update({
      status: status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  await admin.messaging().send(payload);
});
// get request made by the user using users' uid
const getUserRequests = asyncHandler(async (uid) => {
  const snapshot = await requestsRef.where("uid", "==", uid).get();

  const requests = [];
  snapshot.forEach((doc) => {
    requests.push(doc.data());
  });

  return requests;
});
// get All request made by users
const getAllRequest = asyncHandler(async () => {
  const snapshot = await requestsRef.get();
  const requests = [];

  snapshot.forEach((doc) => {
    requests.push(doc.data());
  });

  return requests;
});
// get all request notifications made by users
const getRequestNotification = asyncHandler(async () => {
  const snapshot = await notificationRef.get();

  const notification = [];
  snapshot.forEach((doc) => {
    notification.push(doc.data());
  });

  return notification;
});

const getRequisitionResponseNotification = asyncHandler(async (uid) => {
  const snapshot = await notificationRef.where("receiverId", "==", uid).get();

  const notification = [];
  snapshot.forEach((doc) => {
    notification.push(doc.data());
  });

  return notification;
});
// update firebase cloud messaging token
const updateFcmToken = asyncHandler(async (uid, fcmToken) => {
  return usersRef.doc(uid).update({ fcmToken: fcmToken });
});

module.exports = {
  createUser,
  getAllUsers,
  setAdmin,
  createRequest,
  respondUserRequest,
  getUserRequests,
  getAllRequest,
  getRequestNotification,
  getRequisitionResponseNotification,
  updateFcmToken,
};
