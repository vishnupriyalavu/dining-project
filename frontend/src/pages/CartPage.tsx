import { useCartStore } from "../store/cartStore"
import { Button } from "../components/ui/button"

export default function CartPage() {

  const cart = useCartStore((state) => state.cart)
  const increase = useCartStore((state) => state.increaseQuantity)
  const decrease = useCartStore((state) => state.decreaseQuantity)
  const handleCheckout = async () => {
  try {
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:5000/orders/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    console.log("Order created:", data)

  } catch (error) {
    console.error(error)
  }
}

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500">
          Browse food and add items to your cart.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Your Cart
      </h1>

      <div className="space-y-4">

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-4 rounded-lg shadow-sm"
          >

            {/* Food Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            {/* Food Info */}
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-500">₹{item.price}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">

              <button
                onClick={() => decrease(item.id)}
                className="px-3 py-1 border rounded"
              >
                -
              </button>

              <span className="font-medium">
                {item.quantity}
              </span>

              <button
                onClick={() => increase(item.id)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>

            </div>

            {/* Item Total */}
            <div className="font-semibold w-20 text-right">
              ₹{item.price * item.quantity}
            </div>

          </div>
        ))}

      </div>

      {/* Total Section */}
      <div className="mt-8 flex justify-between items-center border-t pt-6">

        <h2 className="text-xl font-bold">
          Total: ₹{totalPrice}
        </h2>
<div className="flex justify-end mt-4">
  <Button
    onClick={handleCheckout}
    disabled={cart.length === 0}
    className="bg-green-600 hover:bg-green-700 px-6 py-2"
  >
    Checkout
  </Button>
</div>

      </div>

    </div>
  )
}