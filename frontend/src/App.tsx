import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./routes/ProtectedRoute"

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const CartPage = lazy(() => import("./pages/CartPage"))
const OrdersPage = lazy(() => import("./pages/OrdersPage"))
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))

function App() {
  return (
    <Router>

      <Navbar />

      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>

        <Routes>

          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/success"
            element={<OrderSuccessPage />}
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

        </Routes>

      </Suspense>

    </Router>
  )
}

export default App
