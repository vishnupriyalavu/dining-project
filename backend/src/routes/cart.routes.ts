import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware"
import { addToCart, getCart, updateCartItem, removeCartItem } from "../controllers/cart.controller"

const router = Router()

router.post("/", authenticate, addToCart)
router.get("/", authenticate, getCart)
router.put("/:id", authenticate, updateCartItem)
router.delete("/:id", authenticate, removeCartItem)

export default router