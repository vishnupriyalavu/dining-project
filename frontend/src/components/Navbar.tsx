import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white shadow-sm">

      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-orange-600"
        >
          🍽 Dining
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-gray-700 hover:text-orange-500"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
          >
            <ShoppingCart size={20} />
            Cart
          </Link>

          <Link
            to="/login"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Login
          </Link>

        </div>

      </div>

    </nav>
  )
}