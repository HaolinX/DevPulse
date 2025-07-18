import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./context/auth_context"
import Auth from './pages/auth'
import Navbar from "./components/nav_bar"
import Dashboard from "./pages/dashboard"
import PrivateRoute from "./components/private_route"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App