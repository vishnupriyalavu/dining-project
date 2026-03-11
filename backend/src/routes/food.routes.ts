import { Router } from "express"
import {
  getFoods,
  getFoodById,
  searchFood,
  getFeaturedFoods
} from "../controllers/food.controller"

const router = Router()

router.get("/", getFoods)
router.get("/search", searchFood)
router.get("/:id", getFoodById)
router.get("/featured", getFeaturedFoods)

export default router