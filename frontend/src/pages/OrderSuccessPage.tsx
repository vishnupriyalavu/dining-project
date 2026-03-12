import { CheckCircle2, Clock3, MapPinned } from "lucide-react"
import { Link } from "react-router-dom"

export default function OrderSuccessPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[36px] border border-emerald-100 bg-white shadow-2xl shadow-emerald-100/60">
        <div className="bg-gradient-to-r from-emerald-500 via-lime-500 to-amber-400 px-6 py-10 text-slate-950 sm:px-10">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-12 w-12" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em]">
                Order Confirmed
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight">
                Your order was placed successfully.
              </h1>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-10">
          <div className="rounded-[28px] bg-slate-50 p-5">
            <Clock3 className="h-6 w-6 text-orange-500" />
            <h2 className="mt-3 text-lg font-bold text-slate-900">
              Estimated Time
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your food should reach you in around 25 to 35 minutes.
            </p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-5">
            <MapPinned className="h-6 w-6 text-orange-500" />
            <h2 className="mt-3 text-lg font-bold text-slate-900">
              Delivery Status
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              The kitchen has received the order and started preparing it.
            </p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-5">
            <CheckCircle2 className="h-6 w-6 text-orange-500" />
            <h2 className="mt-3 text-lg font-bold text-slate-900">
              Payment Mode
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              The selected payment option has been recorded with the order.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-6 sm:flex-row sm:justify-end sm:px-10">
          <Link
            to="/orders"
            className="inline-flex items-center justify-center rounded-full border border-orange-200 px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            View Orders
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
