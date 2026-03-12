import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "../store/cartStore"


export default function Navbar() {
  const cart = useCartStore((state) => state.cart);

  return (
    <nav className="w-full border-b bg-white shadow-sm">

      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex gap-4">
</div>

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
  className="flex items-center gap-1 relative"
>
  <ShoppingCart size={20} />

  {cart.length > 0 && (
    <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
      {cart.length}
    </span>
  )}
</Link>

          <Link
            to="/login"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Login
          </Link>
          <Link to="/orders">Orders</Link>


        </div>

      </div>

    </nav>
  )
}