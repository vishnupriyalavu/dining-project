import { Router } from "express"
import { createOrder, getOrders } from "../controllers/order.controller"
import { authenticate } from "../middleware/auth.middleware"

const router = Router()

router.post("/checkout", authenticate, createOrder)

router.get("/history", authenticate, getOrders)

export default router