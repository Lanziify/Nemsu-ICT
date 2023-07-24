const admin = require('../config/firebase-admin-config')
const asyncHandler = require('express-async-handler')

// firestore collection references
const db = admin.firestore()
const usersRef = db.collection('users')
const requestsRef = db.collection('requests')
const notificationRef = db.collection('notifications')

// Add user to firebase authentication
// and creates a user document on the firestore db
const createUser = asyncHandler(async (name, position, email, password) => {
  const user = await admin.auth().createUser({
    email,
    password,
  })

  const userData = {
    admin: false,
    uid: user.uid,
    fcmToken: '',
    name: name,
    position: position,
    email: user.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  }

  await admin.auth().setCustomUserClaims(user.uid, { admin: userData.admin })

  const userDocRef = usersRef.doc(user.uid)
  await userDocRef.set({ ...userData })
  // Return true to indicate success
})

// get all registered users
const getAllUsers = asyncHandler(async () => {
  const snapshot = await usersRef.where('admin', '==', false).get()
  const users = []

  snapshot.forEach((doc) => {
    users.push(doc.data())
  })

  return users
})
// Updates user role using their uid
const setAdmin = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true })
    await usersRef.doc(uid).update({ admin: true })
  } catch (error) {
    console.error('Error setting admin claims:', error)
  }
}
// store users' repair requisition to firestore
// and creates a notification document using the data argument
// then fires the notification on the admins' interface/background
const createRequest = asyncHandler(async ({ data }) => {
  const userDoc = (await usersRef.where('uid', '==', data.uid).limit(1).get())
    .docs[0]
  const adminDoc = (await usersRef.where('admin', '==', true).limit(1).get())
    .docs[0]

  const userSnapshot = userDoc.data()
  const adminSnapshot = adminDoc.data()

  const requestDocRef = requestsRef.doc()
  const notificationDocRef = notificationRef.doc()

  const request = {
    ...data,
    requestId: requestDocRef.id,
    name: userSnapshot.name,
    position: userSnapshot.position,
    email: userSnapshot.email,
    status: 'Pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  }

  const notification = {
    notificationId: notificationDocRef.id,
    senderId: data.uid,
    senderName: userSnapshot.name,
    receiverId: adminSnapshot.uid,
    title: `${data.device} repair requisition`,
    body: `You have a repair request from ${userSnapshot.name}`,
    data: { ...data },
    read: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  }

  const payload = {
    token: adminSnapshot.fcmToken,
    data: {
      title: `${data.device} repair requisition`,
      subtitle: `You have a repair request from ${userSnapshot.name}`,
      messageId: notificationDocRef.id,
    },
  }

  await requestDocRef.set(request)
  await notificationDocRef.set(notification)
  await admin.messaging().send(payload)
})
// respond to users request
const respondUserRequest = asyncHandler(async (requesId, data) => {
  const requestDoc = (
    await requestsRef.where('requestId', '==', requesId).get()
  ).docs[0]
  const requestSnapshot = requestDoc.data()

  const userDoc = (await usersRef.where('uid', '==', requestSnapshot.uid).get())
    .docs[0]
  const userSnapshot = userDoc.data()

  const notificationDocRef = notificationRef.doc()

  const notification = {
    notificationId: notificationDocRef.id,
    senderId: data.uid,
    senderName: data.name,
    receiverId: userSnapshot.uid,
    title: `Digital Transformation Office`,
    body: `Your repair request ${notificationDocRef.id} has been accepted`,
    // data: { ...data },
    read: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  }

  const payload = {
    token: userSnapshot.fcmToken,
    data: {
      title: `Digital Transformation Office`,
      subtitle: `Your repair request ${notificationDocRef.id} has been accepted`,
      messageId: notificationDocRef.id,
    },
  }

  await notificationDocRef.set(notification)
  await requestsRef.doc(requesId).update({ status: data.status })
  await admin.messaging().send(payload)
})
// get request made by the user using users' uid
const getUserRequests = asyncHandler(async (uid) => {
  const snapshot = await requestsRef.where('uid', '==', uid).get()

  const requests = []
  snapshot.forEach((doc) => {
    requests.push(doc.data())
  })

  return requests
})
// get All request made by users
const getAllRequest = asyncHandler(async () => {
  const snapshot = await requestsRef.get()
  const requests = []

  snapshot.forEach((doc) => {
    requests.push(doc.data())
  })

  return requests
})
// get all request notifications made by users
const getRequestNotification = asyncHandler(async () => {
  const snapshot = await notificationRef.get()

  const notification = []
  snapshot.forEach((doc) => {
    notification.push(doc.data())
  })

  return notification
})

const getRequisitionResponseNotification = asyncHandler(async (uid) => {
  const snapshot = await notificationRef.where('receiverId', '==', uid).get()

  const notification = []
  snapshot.forEach((doc) => {
    notification.push(doc.data())
  })

  return notification
})
// update firebase cloud messaging token
const updateFcmToken = asyncHandler(async (uid, fcmToken) => {
  return usersRef.doc(uid).update({ fcmToken: fcmToken })
})

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
}
