import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    createRecipe,
    getRecipes,
    getRecipeById,
    deleteRecipe,
    updateRecipe
} from "../controllers/recipeController.js";

const router = express.Router();

router.post("/", protect, createRecipe);
router.get("/", protect, getRecipes);
router.get("/:id", protect, getRecipeById);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);

export default router;

