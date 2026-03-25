import { Plus } from "lucide-react"
import { toast } from "sonner"

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
    try {
      await addToCart({
        id,
        name,
        price,
        image,
        quantity: 1,
      })
      toast.success(`${name} added to cart`)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add item to cart"
      )
    }
  }

  return (
    <Card className="group overflow-hidden rounded-[30px] border border-[#70193d]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,245,247,0.96))] shadow-[0_18px_50px_rgba(112,25,61,0.08)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_24px_70px_rgba(112,25,61,0.12)]">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/10 to-transparent" />
        <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-white/15 blur-2xl transition duration-500 group-hover:scale-125" />
        <div className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-white/85 px-3 py-1 text-sm font-semibold text-[#70193d] shadow-md backdrop-blur">
          Fresh pick
        </div>
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-xl font-black tracking-tight text-slate-900">
            {name}
          </h3>
          <p className="min-h-12 text-sm leading-6 text-slate-500/90">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Starting at
            </p>
            <p className="mt-1 text-2xl font-black tracking-tight text-[#70193d]">
              Rs. {price.toFixed(2)}
            </p>
          </div>

          <Button
            onClick={() => void handleAddToCart()}
            className="h-11 rounded-2xl bg-gradient-to-r from-[#4a0d29] via-[#70193d] to-[#9a4d6c] px-5 font-bold text-white shadow-lg shadow-[#70193d]/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-[#5b1031] hover:via-[#7f1d46] hover:to-[#ad5f7d]"
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
