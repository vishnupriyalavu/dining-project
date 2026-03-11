import { Request, Response } from "express"
import { prisma } from "../config/prisma"

// Checkout and place order
export const createOrder = async (req: Request, res: Response) => {

  const userId = (req as any).userId

  try {

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { food: true }
    })

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    let total = 0

    const orderItems = cartItems.map(item => {

      total += item.food.price * item.quantity

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.food.price
      }
    })

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: orderItems
        }
      },
      include: {
        items: true
      }
    })

    // clear cart after checkout
    await prisma.cartItem.deleteMany({
      where: { userId }
    })

    res.status(201).json(order)

  } catch (error) {
    res.status(500).json({ message: "Checkout failed" })
  }
}


// Get order history
export const getOrders = async (req: Request, res: Response) => {

  const userId = (req as any).userId

  try {

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    res.json(orders)

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" })
  }
}