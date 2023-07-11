import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "",
  authDomain: "nemsu-ict.firebaseapp.com",
  projectId: "nemsu-ict",
  storageBucket: "nemsu-ict.appspot.com",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
