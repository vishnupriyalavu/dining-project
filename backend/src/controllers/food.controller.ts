import { Request, Response } from "express"
import {prisma} from "../config/prisma"

export const getFoods = async (req: Request, res: Response) => { //menu page, shows all the foods in the database
  try {
    const foods = await prisma.food.findMany() //to get evrysingle row in food table

    res.status(200).json(foods)
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch foods"
    })
  }
}

export const getFoodById = async (req: Request, res: Response) => {
  const id = req.params.id as string

  try {
    const food = await prisma.food.findUnique({
      where: { id }
    })

    if (!food) { //user tries to access a food ID that was deleted or doesn't exist, you send a 404
      return res.status(404).json({
        message: "Food not found"
      })
    }

    res.status(200).json(food)

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch food"
    })
  }
}

export const searchFood = async (req: Request, res: Response) => {
  const query = (req.query.q as string | undefined)?.trim()

  try {
    const foods = await prisma.food.findMany({
      where: query
        ? {
            name: {
              contains: query,
              mode: "insensitive"
            }
          }
        : undefined
    })

    res.status(200).json(foods)

  } catch (error) {
    res.status(500).json({
      message: "Search failed"
    })
  }
}
export const getFeaturedFoods = async (req: Request, res: Response) => {

  try {

    const foods = await prisma.food.findMany({
      where: {
        featured: true
      }
    })

    res.json(foods)

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch featured foods"
    })
  }
}
