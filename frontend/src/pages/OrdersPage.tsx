import { useEffect, useMemo, useState } from "react"
import { CalendarDays, ReceiptText } from "lucide-react"

interface Food {
  name: string
  price: number
}

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: Food
}

interface Order {
  id: string
  createdAt: string
  total: number
  items: OrderItem[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token")

        const response = await fetch("http://localhost:5000/orders/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()
        setOrders(Array.isArray(data) ? data : data.orders || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const totalSpent = useMemo(
    () =>
      orders.reduce(
        (sum, order) => sum + order.total,
        0
      ),
    [orders]
  )

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-slate-500">Loading orders...</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-[32px] bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 p-6 text-white shadow-2xl shadow-slate-900/20 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">
          Order History
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Every meal you have ordered, in one place.
        </h1>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
          <span className="rounded-full bg-white/10 px-4 py-2">
            {orders.length} order{orders.length === 1 ? "" : "s"}
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2">
            Total spent: Rs. {totalSpent.toFixed(2)}
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-[28px] border border-orange-100 bg-white p-10 text-center shadow-lg shadow-orange-100/40">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <ReceiptText className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            No orders yet
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Your completed orders will appear here after checkout.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {orders.map((order) => {
            const orderTotal = order.total

            return (
              <article
                key={order.id}
                className="rounded-[28px] border border-orange-100 bg-white p-5 shadow-lg shadow-orange-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6"
              >
                <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                      Order ID
                    </p>
                    <p className="mt-1 text-lg font-black text-slate-900">
                      {order.id}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          Rs. {item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <p className="text-base font-black text-slate-900">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex justify-end">
                  <div className="rounded-2xl bg-slate-950 px-5 py-4 text-right text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">
                      Order Total
                    </p>
                    <p className="mt-1 text-2xl font-black">
                      Rs. {orderTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
