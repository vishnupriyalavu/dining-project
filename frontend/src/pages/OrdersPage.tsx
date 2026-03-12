import { useEffect, useState } from "react"

interface Food {
  name: string
  price: number
}

interface OrderItem {
  id: string
  quantity: number
  food: Food
}

interface Order {
  id: string
  createdAt: string
  items: OrderItem[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:5000/orders/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 mb-4 shadow-sm"
        >
          <p className="font-semibold">
            Order Date: {new Date(order.createdAt).toLocaleString()}
          </p>

          <div className="mt-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.food.name} × {item.quantity}
                </span>
                <span>₹{item.food.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}