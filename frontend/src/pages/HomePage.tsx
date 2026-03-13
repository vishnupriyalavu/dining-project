import { useEffect, useMemo, useState } from "react"
import { ArrowRight, Clock3, Star, Truck } from "lucide-react"

import FoodCard from "../components/FoodCard"
import FoodCarousel from "../components/FoodCarousel"
import { getFoods } from "../services/foodService"

interface Food {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function HomePage() {
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getFoods()

        if (Array.isArray(data)) {
          setFoods(data)
        } else if (Array.isArray(data?.foods)) {
          setFoods(data.foods)
        } else {
          setFoods([])
        }
      } catch (error) {
        console.error("Error fetching foods:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFoods()
  }, [])

  const featuredFoods = useMemo(() => foods.slice(0, 3), [foods])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-slate-500">Loading foods...</p>
      </div>
    )
  }

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.08),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(115,115,115,0.08),_transparent_22%),linear-gradient(180deg,_#fafafa_0%,_#ffffff_40%,_#f4f4f5_100%)]">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <FoodCarousel />
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-8 lg:py-12">
        <div className="flex flex-col justify-center">
          <p className="inline-flex w-fit rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-black shadow-sm backdrop-blur">
            Fast delivery across your city
          </p>
          <h1 className="mt-6 max-w-xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Order Your Favorite Food Instantly
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Discover restaurant-style meals, quick bites, and comfort food made
            to arrive hot, fresh, and right on time.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-black via-zinc-800 to-zinc-600 px-6 py-3 font-bold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:from-zinc-900 hover:via-zinc-700 hover:to-zinc-500"
            >
              Explore Menu
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#featured"
              className="inline-flex items-center rounded-full border border-black/10 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition hover:bg-zinc-100"
            >
              Featured Dishes
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[26px] border border-black/10 bg-white/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <Clock3 className="h-5 w-5 text-black" />
              <p className="mt-3 font-bold text-slate-900">20 min average</p>
              <p className="mt-1 text-sm text-slate-500">
                Quick preparation and dispatch.
              </p>
            </div>
            <div className="rounded-[26px] border border-black/10 bg-white/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <Star className="h-5 w-5 text-black" />
              <p className="mt-3 font-bold text-slate-900">Top rated dishes</p>
              <p className="mt-1 text-sm text-slate-500">
                Curated comfort food and chef specials.
              </p>
            </div>
            <div className="rounded-[26px] border border-black/10 bg-white/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <Truck className="h-5 w-5 text-black" />
              <p className="mt-3 font-bold text-slate-900">Live order flow</p>
              <p className="mt-1 text-sm text-slate-500">
                Smooth checkout and reliable delivery.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {featuredFoods.slice(0, 2).map((food) => (
            <div
              key={food.id}
              className="group relative overflow-hidden rounded-[34px] border border-black/10 shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
            >
              <img
                src={food.image}
                alt={food.name}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-200">
                  Featured
                </p>
                <h2 className="mt-2 text-2xl font-black">{food.name}</h2>
                <p className="mt-1 text-sm text-slate-200">
                  Rs. {food.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div className="rounded-[34px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_24%),linear-gradient(135deg,#09090b,#18181b_55%,#3f3f46)] p-6 text-white shadow-2xl shadow-slate-900/20 sm:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-zinc-300">
              Why customers love it
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Modern meals, quick checkout, zero friction.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Browse, add to cart, choose a simple payment option, and confirm
              your order in a smooth flow optimized for desktop, tablet, and
              mobile.
            </p>
          </div>
        </div>
      </section>

      <section
        id="featured"
        className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black">
              Featured Food
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Popular dishes customers keep reordering
            </h2>
          </div>
          <p className="max-w-xl text-sm text-slate-500">
            A short list of high-demand meals picked from the live menu.
          </p>
        </div>

        {featuredFoods.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredFoods.map((food) => (
              <FoodCard
                key={food.id}
                id={food.id}
                name={food.name}
                description={food.description}
                price={food.price}
                image={food.image}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No featured foods available.</p>
        )}
      </section>

      <section
        id="menu"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
            Full Menu
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Discover delicious food for every craving
          </h2>
        </div>

        {foods.length === 0 ? (
          <div className="rounded-[30px] border border-black/10 bg-white/90 p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <p className="text-sm text-slate-500">No foods available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {foods.map((food) => (
              <FoodCard
                key={food.id}
                id={food.id}
                name={food.name}
                description={food.description}
                price={food.price}
                image={food.image}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
