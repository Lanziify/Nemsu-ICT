importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAbKiB7DY3pn4yq2w6FzsBkik44EWhF5N4",
  authDomain: "digital-transformation-office.firebaseapp.com",
  projectId: "digital-transformation-office",
  storageBucket: "digital-transformation-office.appspot.com",
  messagingSenderId: "851532484952",
  appId: "1:851532484952:web:f6529ffa89ef0c8cf1152d"
});

const messaging = firebase.messaging();

// Handle incoming messages
messaging.onMessage((payload) => {
  // Customize how you handle the incoming message
  console.log('Foreground message received:', payload);
});

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.subtitle,
    icon: "http://localhost:5173/src/assets/logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
