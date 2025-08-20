import React, { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config.js";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Track the current authenticated user
  const [loading, setLoading] = useState(true); // Track if the auth state is still loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to register a new user with email and password
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Function to login existing user
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // Function to login with Google using popup
  const googleLogin = () => signInWithPopup(auth, new GoogleAuthProvider());

  const updateUserProfile = async ({ displayName, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  // Function to log out user
  const logout = () => signOut(auth);

  const authInfo = {
    user,
    createUser,
    updateUserProfile,
    login,
    googleLogin,
    loading,
    setLoading,
    resetPassword,
    logout,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

