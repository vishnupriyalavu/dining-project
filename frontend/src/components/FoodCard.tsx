import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

interface FoodCardProps {
  name: string
  price: number
  image: string
}

export default function FoodCard({ name, price, image }: FoodCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition duration-300">

      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />

      <CardContent className="p-4">

        <h3 className="text-lg font-semibold text-gray-800">
          {name}
        </h3>

        <p className="text-orange-500 font-bold mt-1">
          ₹{price}
        </p>

        <Button className="w-full mt-3 bg-orange-500 hover:bg-orange-600">
          Add to Cart
        </Button>

      </CardContent>

    </Card>
  )
}