importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
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
