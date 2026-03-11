import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
import foodRoutes from "./routes/food.routes"
import cartRoutes from "./routes/cart.routes"
import orderRoutes from "./routes/order.routes"
import userRoutes from "./routes/user.routes"
dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/auth", authRoutes)
app.use("/foods", foodRoutes)
app.use("/cart", cartRoutes)
app.use("/orders", orderRoutes)
app.use("/users", userRoutes)

const PORT = process.env.PORT || 5000

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Dining App Backend Running"
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})