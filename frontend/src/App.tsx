import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"

function App() {
  return (
    <BrowserRouter>

      <Navbar />

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/cart" element={<CartPage />} />
</Routes>

    </BrowserRouter>
  )
}

export default App
