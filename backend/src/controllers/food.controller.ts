import { Request, Response } from "express"
import {prisma} from "../config/prisma"

export const getFoods = async (req: Request, res: Response) => {
  try {
    const foods = await prisma.food.findMany()

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

    if (!food) {
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
  const query = req.query.q as string

  try {
    const foods = await prisma.food.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive"
        }
      }
    })

    res.status(200).json(foods)

  } catch (error) {
    res.status(500).json({
      message: "Search failed"
    })
  }
}