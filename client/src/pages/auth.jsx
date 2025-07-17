import { useState } from "react"

export default function Auth() {
  const [tab, setTab] = useState("login")
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const switchTab = (target) => {
    setTab(target)
    setForm({ username: "", password: "", confirmPassword: "" })
    setError("")
    setSuccess("")
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (tab === "register" && form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    const endpoint = tab === "login" ? "/api/auth/login" : "/api/auth/register"
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Something went wrong")
      } else {
        if (tab === "login") {
          localStorage.setItem("token", data.token)
          localStorage.setItem("username", data.user.username)
          setSuccess("Login successful!")
          window.location.href = "/dashboard"
        } else {
          setSuccess("Registration successful! Please log in.")
          switchTab("login")
        }
      }
    } catch (err) {
      setError("Connection error")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-6 w-96 rounded shadow">
        <div className="flex justify-between mb-4">
          <button
            className={`w-1/2 py-2 ${tab === "login" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
            onClick={() => switchTab("login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 ${tab === "register" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
            onClick={() => switchTab("register")}
          >
            Register
          </button>
        </div>

        {error && <div className="text-red-600 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          {tab === "register" && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            {tab === "login" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  )
}