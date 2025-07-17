import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem("token")
  const username = localStorage.getItem("username")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    navigate("/auth")
  }

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        DevPulse
      </Link>

      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <span className="text-gray-600">👋 {username}</span>
            <Link to="/dashboard" className="text-indigo-600 hover:underline">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}