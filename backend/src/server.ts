import express, { Request, Response } from "express"
import cors from "cors"
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

// Middleware
app.use(cors({origin: "http://localhost:5173",
  credentials:true}
))
app.use(express.json())

// Routes
app.use("/auth", authRoutes)
app.use("/foods", foodRoutes)
app.use("/cart", cartRoutes)
app.use("/orders", orderRoutes)
app.use("/users", userRoutes)
app.use("/payment", paymentRoutes)
app.use("/profile", profileRoutes)

const PORT = process.env.PORT || 5000

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Dining App Backend Running"
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
