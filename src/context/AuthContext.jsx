import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../Config/firebase.config"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // observer for user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  const value = {
    user,
    setUser,
    logout,
    loading,
    isLoggedIn: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
