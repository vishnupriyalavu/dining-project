import { useEffect, useMemo, useState } from "react"
import { IndianRupee, Minus, Plus, ShoppingBag, Wallet } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "../components/ui/button"
import { useCartStore } from "../store/cartStore"

export default function CartPage() {
  const navigate = useNavigate()
  const cart = useCartStore((state) => state.cart)
  const increase = useCartStore((state) => state.increaseQuantity)
  const decrease = useCartStore((state) => state.decreaseQuantity)
  const fetchCart = useCartStore((state) => state.fetchCart)
  const syncLocalCart = useCartStore((state) => state.syncLocalCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const isLoading = useCartStore((state) => state.isLoading)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<"UPI" | "COD" | null>(
    null
  )

  const totalItems = useMemo(
    () => cart.reduce((count, item) => count + item.quantity, 0),
    [cart]
  )

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  )

  const handlePlaceOrder = async () => {
    setError(null)
    setIsCheckingOut(true)

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("Please log in to continue.")
      }

      await syncLocalCart()

      const response = await fetch("http://localhost:5000/orders/checkout", {
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

      clearCart()
      setShowPaymentOptions(false)
      setSelectedMethod(null)
      navigate("/success")
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Checkout failed. Please try again."
      )
      setIsCheckingOut(false)
    }
  }

  const handleCheckoutClick = async () => {
    setError(null)
    await syncLocalCart()
    setShowPaymentOptions(true)
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
        <div className="rounded-[28px] border border-orange-100 bg-white p-10 text-center shadow-lg shadow-orange-100/40">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600">
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
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
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
                className="group rounded-[28px] border border-orange-100 bg-white p-4 shadow-lg shadow-orange-100/40 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-full rounded-2xl object-cover sm:h-28 sm:w-32"
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

                      <div className="rounded-2xl bg-orange-50 px-4 py-3 text-left sm:min-w-32 sm:text-right">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">
                          Subtotal
                        </p>
                        <p className="mt-1 text-lg font-black text-slate-900">
                          Rs. {subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 p-1 shadow-sm">
                        <button
                          type="button"
                          onClick={() => void decrease(item.id)}
                          className="rounded-full p-2 text-slate-700 transition hover:bg-white hover:text-orange-600"
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
                          className="rounded-full p-2 text-slate-700 transition hover:bg-white hover:text-orange-600"
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

        <aside className="h-fit rounded-[32px] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">
            Payment
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight">
            Ready to place the order?
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Confirm your items, choose UPI or cash on delivery, and place the
            order instantly.
          </p>

          <div className="mt-8 space-y-4 rounded-[24px] bg-white/8 p-5">
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
              onClick={() => void handleCheckoutClick()}
              disabled={isCheckingOut}
              className="h-12 w-full rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 px-6 text-base font-bold text-slate-950 shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-orange-400 hover:via-amber-400 hover:to-yellow-300 sm:w-auto"
            >
              Choose Payment Method
            </Button>
          </div>
        </aside>
      </div>

      {showPaymentOptions ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[32px] bg-white p-6 shadow-2xl sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
              Payment Options
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
              Select how you want to pay
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Choose a simple payment mode and place the order instantly.
            </p>

            <div className="mt-6 grid gap-4">
              <button
                type="button"
                onClick={() => setSelectedMethod("UPI")}
                className={`rounded-[28px] border p-5 text-left transition-all ${
                  selectedMethod === "UPI"
                    ? "border-orange-400 bg-orange-50 shadow-lg shadow-orange-100"
                    : "border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-950 p-3 text-white">
                    <IndianRupee className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">UPI</p>
                    <p className="text-sm text-slate-500">
                      Confirm the order with a simple digital payment option.
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod("COD")}
                className={`rounded-[28px] border p-5 text-left transition-all ${
                  selectedMethod === "COD"
                    ? "border-orange-400 bg-orange-50 shadow-lg shadow-orange-100"
                    : "border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-950 p-3 text-white">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      Cash on Delivery
                    </p>
                    <p className="text-sm text-slate-500">
                      Pay when the order reaches your doorstep.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {selectedMethod ? (
              <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
                Selected: {selectedMethod}
              </p>
            ) : null}

            {error ? (
              <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowPaymentOptions(false)
                  setSelectedMethod(null)
                }}
                className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <Button
                onClick={() => void handlePlaceOrder()}
                disabled={!selectedMethod || isCheckingOut}
                className="h-12 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 px-6 text-base font-bold text-slate-950 shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-orange-400 hover:via-amber-400 hover:to-yellow-300"
              >
                {isCheckingOut ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
