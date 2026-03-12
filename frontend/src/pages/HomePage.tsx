import { useEffect, useState } from "react"
import FoodCard from "../components/FoodCard"
import { getFoods } from "../services/foodService"
import FoodCarousel from "../components/FoodCarousel"

export default function HomePage() {

  const [foods, setFoods] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getFoods()

        console.log("API response:", data)

        // Handle both response formats
        if (Array.isArray(data)) {
          setFoods(data)
        } else if (data?.foods) {
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-gray-500">Loading foods...</p>
      </div>
    )
  }
return (
  <div className="max-w-6xl mx-auto p-6">

    <FoodCarousel />

    <h1 className="text-3xl font-bold text-gray-800">
      Discover Delicious Food
    </h1>

      <p className="text-gray-500 mt-2 mb-6">
        Browse our menu and order your favorite meals.
      </p>

      {foods.length === 0 ? (
        <p className="text-gray-500">No foods available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

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

    </div>
  )
}