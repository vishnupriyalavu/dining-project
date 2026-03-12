import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Navbar from "./components/Navbar"

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const CartPage = lazy(() => import("./pages/CartPage"))

function App() {
  return (
    <Router>

      <Navbar />

      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

      </Suspense>

    </Router>
  )
}

export default App
