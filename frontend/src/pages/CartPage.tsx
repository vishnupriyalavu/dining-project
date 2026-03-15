import { useEffect, useMemo, useState } from "react"
import { Minus, Plus, ShoppingBag } from "lucide-react"

import { Button } from "../components/ui/button"
import { API_BASE_URL } from "../services/api"
import { useCartStore } from "../store/cartStore"

export default function CartPage() {
  const cart = useCartStore((state) => state.cart)
  const increase = useCartStore((state) => state.increaseQuantity)
  const decrease = useCartStore((state) => state.decreaseQuantity)
  const fetchCart = useCartStore((state) => state.fetchCart)
  const syncLocalCart = useCartStore((state) => state.syncLocalCart)
  const isLoading = useCartStore((state) => state.isLoading)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalItems = useMemo(
    () => cart.reduce((count, item) => count + item.quantity, 0),
    [cart]
  )

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  )

  const handleStripeCheckout = async () => {
    setError(null)
    setIsCheckingOut(true)

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("Please log in to continue.")
      }

      await syncLocalCart()

      const response = await fetch(`${API_BASE_URL}/payment/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || "Unable to start checkout.")
      }

      if (!data?.url) {
        throw new Error("Stripe checkout URL was not returned.")
      }

      window.location.href = data.url
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Checkout failed. Please try again."
      )
      setIsCheckingOut(false)
    }
  }

  useEffect(() => {
    void fetchCart()
  }, [fetchCart])

  if (isLoading && cart.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-slate-500">Loading cart...</p>
      </section>
    )
  }

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#70193d]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,245,247,0.95))] p-10 text-center shadow-[0_24px_60px_rgba(112,25,61,0.08)]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f6d7e3] to-[#edd1dc] text-[#70193d]">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Your cart is empty
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
            Add a few dishes from the menu and come back here to review your
            order before checkout.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#70193d]">
            Cart Summary
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Review your order
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            {totalItems} item{totalItems > 1 ? "s" : ""} ready for checkout.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_360px]">
        <div className="space-y-4">
          {cart.map((item) => {
            const subtotal = item.price * item.quantity

            return (
              <article
                key={item.id}
                className="group rounded-[30px] border border-[#70193d]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,245,247,0.95))] p-4 shadow-[0_20px_55px_rgba(112,25,61,0.08)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_24px_70px_rgba(112,25,61,0.12)] sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-full rounded-[22px] object-cover sm:h-28 sm:w-32"
                  />

                  <div className="flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Rs. {item.price.toFixed(2)} each
                        </p>
                      </div>

                      <div className="rounded-[22px] border border-[#70193d]/10 bg-white/80 px-4 py-3 text-left shadow-sm sm:min-w-32 sm:text-right">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#70193d]">
                          Subtotal
                        </p>
                        <p className="mt-1 text-lg font-black text-slate-900">
                          Rs. {subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="inline-flex items-center rounded-full border border-[#70193d]/10 bg-white/90 p-1 shadow-sm">
                        <button
                          type="button"
                          onClick={() => void decrease(item.id)}
                          className="rounded-full p-2 text-slate-700 transition hover:bg-[#f8eff3] hover:text-[#70193d]"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-10 text-center text-sm font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => void increase(item.id)}
                          className="rounded-full p-2 text-slate-700 transition hover:bg-[#f8eff3] hover:text-[#70193d]"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-sm font-semibold text-slate-500">
                        Rs. {item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <aside className="relative h-fit overflow-hidden rounded-[34px] border border-[#70193d]/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_26%),linear-gradient(160deg,#3f0d26,#70193d_55%,#9a4d6c)] p-6 text-white shadow-2xl shadow-[#70193d]/25">
          <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f6d7e3]">
            Payment
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight">
            Ready to place the order?
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Confirm your items and continue to secure checkout instantly.
          </p>

          <div className="mt-8 space-y-4 rounded-[26px] border border-white/8 bg-white/8 p-5 backdrop-blur">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-white">Total</span>
              <span className="text-3xl font-black tracking-tight">
                Rs. {totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {error ? (
            <p className="mt-4 rounded-2xl border border-red-300/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => void handleStripeCheckout()}
              disabled={isCheckingOut}
              className="h-12 w-full rounded-2xl bg-gradient-to-r from-white to-[#f6d7e3] px-6 text-base font-bold text-[#70193d] shadow-lg shadow-[#70193d]/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:from-[#fff7fa] hover:to-[#edd1dc] sm:w-auto"
            >
              {isCheckingOut ? "Redirecting..." : "Checkout"}
            </Button>
          </div>
        </aside>
      </div>
    </section>
  )
}
