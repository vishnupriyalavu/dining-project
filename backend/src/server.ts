import express, { Request, Response } from "express"
import cors from "cors" //middleware for handling Cross-Origin Resource Sharing (CORS) in Express applications. It allows you to specify which domains are allowed to access your server's resources, and it can also handle preflight requests for HTTP methods like PUT and DELETE.
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
import foodRoutes from "./routes/food.routes"
import cartRoutes from "./routes/cart.routes"
import orderRoutes from "./routes/order.routes"
import userRoutes from "./routes/user.routes"
import paymentRoutes from "./routes/payment.routes"
import profileRoutes from "./routes/profile.routes"
dotenv.config()

const app = express()
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
].filter(Boolean) as string[]

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true)
      return
    }

    const isAllowedLocalhost = /^http:\/\/localhost:\d+$/.test(origin)
    const isAllowedOrigin = allowedOrigins.includes(origin)

    if (isAllowedLocalhost || isAllowedOrigin) {
      callback(null, true)
      return
    }

    callback(new Error("CORS origin not allowed"))
  },
  credentials: true
}))
app.use(express.json())

// Routes
app.use("/auth", authRoutes) //handles login, signup and JWT tokens
app.use("/foods", foodRoutes) // handles the menu from the database
app.use("/cart", cartRoutes) // store the food which the user wants to buy
app.use("/orders", orderRoutes) //handles the orders
app.use("/users", userRoutes) //handles user data and profile updates
app.use("/payment", paymentRoutes) //converts to an external service like stripe to handle money
app.use("/profile", profileRoutes) //handles user profile data and updates

const PORT = process.env.PORT || 5000

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Dining App Backend Running"
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
