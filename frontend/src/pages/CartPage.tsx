import { useCartStore } from "../store/cartStore"

export default function CartPage() {

  const cart = useCartStore((state) => state.cart)

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="flex gap-4 mb-4">

            <img
              src={item.image}
              className="w-20 h-20 object-cover rounded"
            />

            <div>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>

          </div>
        ))
      )}

    </div>
  )
}