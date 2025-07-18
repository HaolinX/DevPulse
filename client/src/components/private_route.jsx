import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../context/auth_context"

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext)

  if (!user) {
    // 🔒 Not logged in, redirect to auth page
    return <Navigate to="/auth" />
  }

  // ✅ Logged in — show the protected page
  return children
}