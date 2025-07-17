import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./context/auth_context"
import Auth from './pages/auth'
import Navbar from "./components/nav_bar"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App