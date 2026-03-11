import { Request, Response } from "express"
import { prisma } from "../config/prisma"
import { stringify } from "node:querystring"

interface AuthRequest extends Request {
  userId?: string
}


// ADD TO CART
export const addToCart = async (req: AuthRequest, res: Response) => {

  const { productId, quantity } = req.body
  const userId = req.userId

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId,
        productId
      }
    })

    if (existingItem) {

      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity
        }
      })

      return res.json(updatedItem)
    }

    const newItem = await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity
      }
    })

    res.status(201).json(newItem)

  } catch (error) {

    console.error("Add cart error:", error)

    res.status(500).json({
      message: "Failed to add to cart"
    })
  }
}



// GET USER CART
export const getCart = async (req: AuthRequest, res: Response) => {

  const userId = req.userId

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true
      }
    })

    res.json(cartItems)

  } catch (error) {

    console.error("Get cart error:", error)

    res.status(500).json({
      message: "Failed to fetch cart"
    })
  }
}



// UPDATE CART ITEM QUANTITY
export const updateCartItem = async (req: Request, res: Response) => {

  const id = req.params.id as string
  const { quantity } = req.body

  try {

    const updatedItem = await prisma.cartItem.update({
      where: {
        id
      },
      data: {
        quantity
      }
    })

    res.json(updatedItem)

  } catch (error) {

    console.error("Update cart error:", error)

    res.status(500).json({
      message: "Failed to update cart item"
    })
  }
}


// REMOVE ITEM FROM CART
export const removeCartItem = async (req: Request, res: Response) => {

  const id = req.params.id as string

  try {

    await prisma.cartItem.delete({
      where: {
        id
      }
    })

    res.json({
      message: "Item removed from cart"
    })

  } catch (error) {

    console.error("Delete cart error:", error)

    res.status(500).json({
      message: "Failed to remove item"
    })
  }
}
