import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAbKiB7DY3pn4yq2w6FzsBkik44EWhF5N4",
  authDomain: "digital-transformation-office.firebaseapp.com",
  projectId: "digital-transformation-office",
  storageBucket: "digital-transformation-office.appspot.com",
  messagingSenderId: "851532484952",
  appId: "1:851532484952:web:f6529ffa89ef0c8cf1152d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
export default app;