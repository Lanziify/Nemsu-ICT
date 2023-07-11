import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAUxe2cjgHDlr8Io_HrpbJnVcuRCE8xTQA",
  authDomain: "nemsu-ict.firebaseapp.com",
  projectId: "nemsu-ict",
  storageBucket: "nemsu-ict.appspot.com",
  messagingSenderId: "915844339552",
  appId: "1:915844339552:web:04fab39fb2ad6937f3f005",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
