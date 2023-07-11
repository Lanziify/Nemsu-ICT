const admin = require("../config/firebase-admin-config");
const asyncHandler = require("express-async-handler");

const db = admin.firestore();

const createUser = asyncHandler(async (email, password) => {
  try {
    // Add user to firebase authentication
    const user = await admin.auth().createUser({
      email,
      password,
    });
    // initial values from user
    const userData = {
      admin: false,
      uid: user.uid,
      name: "",
      position: "",
      email: user.email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    // Set user token
    await admin.auth().setCustomUserClaims(user.uid, { admin: userData.admin });
    await admin.auth().createCustomToken(user.uid);

    // Store metadata to firebase firestore db
    const userDocRef = db.collection("users").doc(user.uid);
    await userDocRef.set({ ...userData });
    return user;
  } catch (error) {
    console.log(error);
  }
});

const createRequest = asyncHandler(async ({ data }) => {
  const requestDocRef = db.collection("requests").doc();

  const userData = {
    ...data,
    requestId: requestDocRef.id,
    status: "Pending",
    read: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await requestDocRef.set(userData);
});

const getUserRequests = asyncHandler(async (uid) => {
  const requestsRef = db.collection("requests");
  const snapshot = await requestsRef
    .where("uid", "==", uid)
    // .where("status", "==", "Pending")
    .get();

  const requests = [];
  snapshot.forEach((doc) => {
    requests.push(doc.data());
  });

  return requests;
});

// Admin
const getAllRequest = asyncHandler(async () => {
  const requestsRef = db.collection("requests");
  const snapshot = await requestsRef.get();

  const requests = [];
  snapshot.forEach((doc) => {
    requests.push(doc.data());
  });

  return requests;
});

const respondUserRequest = asyncHandler(async (requesId) => {
  const requestsRef = db.collection("requests");
  const snapshot = await requestsRef
    .doc(requesId)
    .update({ status: "Accepted" });

  return snapshot;
});

const setAdmin = asyncHandler(async (uid) => {
  return admin.auth().createCustomToken(uid, { admin: true });
});

module.exports = {
  createUser,
  createRequest,
  getAllRequest,
  getUserRequests,
  respondUserRequest,
  setAdmin,
};
