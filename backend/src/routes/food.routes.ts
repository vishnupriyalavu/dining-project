import { Router } from "express"
import {
  getFoods,
  getFoodById,
  searchFood
} from "../controllers/food.controller"

const router = Router()

router.get("/", getFoods)
router.get("/search", searchFood)
router.get("/:id", getFoodById)

export default router