//critical part of the backend handles the transitions from browsing(cart) to buying(order)
import { Request, Response } from "express"
import { prisma } from "../config/prisma"

// Checkout and place order
export const createOrder = async (req: Request, res: Response) => {

  const userId = (req as any).userId

  try {

    // get user's cart
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

    // create order
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

    // clear cart after order
    await prisma.cartItem.deleteMany({
      where: { userId }
    })

    res.status(201).json({
      message: "Order placed successfully",
      order
    })

  } catch (error) {
    console.error("Order creation error:", error)
    res.status(500).json({ message: "Checkout failed" })
  }
}


// Get order history
export const getOrders = async (req: Request, res: Response) => {

  const userId = (req as any).userId

  try {

    const orders = await prisma.order.findMany({ //It only finds orders belonging to the specific userId
      where: { userId }, 
      include: { //it shows the image and item what was ordered
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

    res.json({
      message: "Orders fetched successfully",
      orders
    })

  } catch (error) {
    console.error("Fetch orders error:", error)
    res.status(500).json({ message: "Failed to fetch orders" })
  }
}