import { useEffect } from "react"
import { ClipboardList, LogIn, LogOut, ShoppingCart } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { useAuthStore } from "../store/authStore"
import { useCartStore } from "../store/cartStore"

export default function Navbar() {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const cart = useCartStore((state) => state.cart)
  const fetchCart = useCartStore((state) => state.fetchCart)

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  useEffect(() => {
    if (token) {
      void fetchCart()
    }
  }, [fetchCart, token])

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-[linear-gradient(180deg,rgba(255,251,235,0.95),rgba(255,255,255,0.86))] backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[20px] bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 text-lg font-black text-white shadow-lg shadow-orange-200 ring-1 ring-white/70">
            D
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-slate-900">
              Dining App
            </p>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Fresh food fast
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-orange-600 hover:shadow-md sm:inline-flex"
          >
            Home
          </Link>

          {token ? (
            <Link
              to="/orders"
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-orange-600 hover:shadow-md sm:px-4"
            >
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </Link>
          ) : null}

          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-950 to-slate-800 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>

          {token ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm transition hover:bg-orange-50 hover:shadow-md"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-300 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-orange-400 hover:via-amber-400 hover:to-yellow-200"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
