import { Plus } from "lucide-react"

import { useCartStore } from "../store/cartStore"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

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
  image,
}: FoodCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = async () => {
    await addToCart({
      id,
      name,
      price,
      image,
      quantity: 1,
    })
  }

  return (
    <Card className="group overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-lg shadow-orange-100/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:shadow-orange-200/50">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/5 to-transparent" />
        <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-orange-600 shadow-md backdrop-blur">
          Fresh pick
        </div>
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-xl font-black tracking-tight text-slate-900">
            {name}
          </h3>
          <p className="min-h-12 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Starting at
            </p>
            <p className="mt-1 text-2xl font-black tracking-tight text-orange-600">
              Rs. {price.toFixed(2)}
            </p>
          </div>

          <Button
            onClick={() => void handleAddToCart()}
            className="h-11 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 px-5 font-bold text-slate-950 shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:from-orange-400 hover:via-amber-400 hover:to-yellow-300"
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
