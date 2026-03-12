import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { useCartStore } from "../store/cartStore"

interface FoodCardProps {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function FoodCard({
  id,
  name,
  description,
  price,
  image
}: FoodCardProps) {

  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1
    })
  }

  return (
    <Card className="overflow-hidden rounded-xl hover:shadow-xl transition duration-300">

      {/* Food Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />

      <CardContent className="p-4">

        {/* Food Name */}
        <h3 className="text-lg font-semibold text-gray-800">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {description}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-4">

          <span className="text-orange-600 font-bold text-lg">
            ₹{price}
          </span>

          <Button
            className="bg-orange-500 hover:bg-orange-600"
            onClick={handleAddToCart}
          >
            Add
          </Button>

        </div>

      </CardContent>
    </Card>
  )
}