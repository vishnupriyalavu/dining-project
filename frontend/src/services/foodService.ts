import { api } from "./api"

export interface Food {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export const getFoods = async () => {
  const response = await api.get<Food[]>("/foods")
  return response.data
}

export const getFeaturedFoods = async () => {
  const response = await api.get<Food[]>("/foods/featured")
  return response.data
}
