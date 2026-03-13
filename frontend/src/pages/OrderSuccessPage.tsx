import { useEffect, useState } from "react"
import { CheckCircle2, LoaderCircle, PartyPopper } from "lucide-react"
import { Link } from "react-router-dom"

import { useCartStore } from "../store/cartStore"

export default function OrderSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart)
  const [isFinalizing, setIsFinalizing] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const finalizeOrder = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          throw new Error("Please log in again to view the order status.")
        }

        const response = await fetch("http://localhost:5000/orders/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (!response.ok && data?.message !== "Cart is empty") {
          throw new Error(data?.message || "Failed to finalize the order.")
        }

        clearCart()
      } catch (finalizeError) {
        setError(
          finalizeError instanceof Error
            ? finalizeError.message
            : "Failed to finalize the order."
        )
      } finally {
        setIsFinalizing(false)
      }
    }

    void finalizeOrder()
  }, [clearCart])

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full overflow-hidden rounded-[40px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,253,244,0.95))] text-center shadow-[0_28px_80px_rgba(16,185,129,0.16)]">
        <div className="bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_24%),linear-gradient(135deg,#22c55e,#84cc16_55%,#fbbf24)] px-6 py-12 text-slate-950 sm:px-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/80 shadow-lg">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.32em]">
            Order Success
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Your order was placed successfully.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-900/75 sm:text-base">
            {isFinalizing
              ? "Confirming your payment and creating the order now."
              : "The restaurant has received your order and started preparing it."}
          </p>
        </div>

        <div className="px-6 py-10 sm:px-10">
          <div className="mx-auto max-w-md rounded-[30px] border border-emerald-100 bg-white/90 p-6 shadow-sm">
            {isFinalizing ? (
              <>
                <div className="flex items-center justify-center gap-3 text-emerald-600">
                  <LoaderCircle className="h-6 w-6 animate-spin" />
                  <span className="text-lg font-bold">Finalizing order</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Please wait while we confirm the payment and save the order.
                </p>
              </>
            ) : error ? (
              <>
                <div className="flex items-center justify-center gap-3 text-red-500">
                  <PartyPopper className="h-6 w-6" />
                  <span className="text-lg font-bold">Payment received</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {error}
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center gap-3 text-emerald-600">
                  <PartyPopper className="h-6 w-6" />
                  <span className="text-lg font-bold">Thank you for ordering</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Your payment is complete and the order is confirmed. You can
                  return to the home page now.
                </p>
              </>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
