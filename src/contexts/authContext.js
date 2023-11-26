import React, { useContext, useState, useEffect } from "react"
import firebase from "@/libs/firebaseConnection";

const AuthContext = React.createContext()
export function useAuth() {
  return useContext(AuthContext)
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  function signup(email, password) {
    return firebase.createUserWithEmailAndPassword(email, password)
  }
  function login(email, password) {
    return firebase.signInWithEmailAndPassword(email, password)
  }
  function logout() {
    return firebase.signOut()
  }
  function resetPassword(email) {
    return firebase.sendPasswordResetEmail(email)
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  useEffect(() => {
    const unsubscribe = firebase.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    signInWithGoogle
  }
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await firebase.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setCurrentUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}