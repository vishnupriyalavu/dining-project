import { Request, Response } from "express"
import Stripe from "stripe"
import { FRONTEND_URL, getStripeSecretKey } from "../config/env"
import { prisma } from "../config/prisma"

export const createCheckoutSession = async (req: Request, res: Response) => {

  const userId = (req as any).userId

  try {
    const stripe = new Stripe(getStripeSecretKey())

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
        unit_amount: Math.round(item.food.price * 100)//stripe calculates in paise/cents
      },
      quantity: item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/cart`
    })

    res.json({ url: session.url })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Payment failed" })
  }
}
