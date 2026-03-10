import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
import foodRoutes from "./routes/food.routes"

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/auth", authRoutes)
app.use("/foods", foodRoutes)

const PORT = process.env.PORT || 5000

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Dining App Backend Running"
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})