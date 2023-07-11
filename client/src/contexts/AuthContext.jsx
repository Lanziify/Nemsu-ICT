import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const UserAuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  // Login user with email and password
  function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  // Logout user
  function logoutUser() {
    return auth.signOut();
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Fetch the user's profile data
        currentUser
          .getIdTokenResult()
          .then((idTokenResult) => {
            const profileData = idTokenResult;
            setUserProfile(profileData);
          })
          .catch((error) => {
            console.error("Error fetching user profile:", error);
          });
      } else {
        setUserProfile(null);
      }
    });
    return unsubscribe;
  }, []);

  const value = { user, loginUser, logoutUser, userProfile };

  return (
    <UserAuthContext.Provider value={value}>
      {!loading && children}
    </UserAuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(UserAuthContext);
}
