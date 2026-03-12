import { Request, Response } from "express"
import Stripe from "stripe"
import { prisma } from "../config/prisma"

const stripe = new Stripe(process.env.SECRET_KEY as string)

export const createCheckoutSession = async (req: Request, res: Response) => {

  const userId = (req as any).userId

  try {

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { food: true }
    })

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.food.name
        },
        unit_amount: Math.round(item.food.price * 100)
      },
      quantity: item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart"
    })

    res.json({ url: session.url })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Payment failed" })
  }
}