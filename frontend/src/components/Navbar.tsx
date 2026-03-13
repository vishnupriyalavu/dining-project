import { useEffect } from "react"
import {
  ClipboardList,
  LogIn,
  LogOut,
  ShoppingCart,
  UserRound,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { useAuthStore } from "../store/authStore"
import { useCartStore } from "../store/cartStore"

export default function Navbar() {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const cart = useCartStore((state) => state.cart)
  const fetchCart = useCartStore((state) => state.fetchCart)
  const clearCart = useCartStore((state) => state.clearCart)

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  const handleLogout = () => {
    clearCart()
    logout()
    navigate("/login")
  }

  useEffect(() => {
    if (token) {
      void fetchCart()
    }
  }, [fetchCart, token])

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,245,245,0.9))] backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[20px] bg-gradient-to-br from-black via-zinc-800 to-zinc-600 text-lg font-black text-white shadow-lg shadow-black/20 ring-1 ring-white/70">
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
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-black hover:shadow-md sm:inline-flex"
          >
            Home
          </Link>

          {token ? (
            <Link
              to="/orders"
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-black hover:shadow-md sm:px-4"
            >
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </Link>
          ) : null}

          {token ? (
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-white hover:text-black hover:shadow-md sm:px-4"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-black via-zinc-800 to-zinc-600 text-white">
                <UserRound className="h-4 w-4" />
              </span>
              <span className="hidden sm:inline">Profile</span>
            </Link>
          ) : null}

          {token ? (
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-950 to-slate-800 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-black ring-1 ring-black/10">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          ) : null}

          {token ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-zinc-100 hover:shadow-md"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-black via-zinc-800 to-zinc-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-zinc-900 hover:via-zinc-700 hover:to-zinc-500"
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
