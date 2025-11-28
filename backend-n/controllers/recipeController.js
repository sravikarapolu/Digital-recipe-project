
import Recipe from "../models/recipeModel.js";

// @desc Get all recipes
export const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

// @desc Create new recipe
export const createRecipe = async (req, res, next) => {
  try {
    const { title, ingredients, steps } = req.body;

    if (!title || !ingredients || !steps) {
      return next({ statusCode: 400, message: "All fields are required" });
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return next({ statusCode: 400, message: "Ingredients must be a non-empty array" });
    }

    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};

// @desc Get recipe by ID
export const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return next({ statusCode: 404, message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

// @desc Update recipe
export const updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!recipe) {
      return next({ statusCode: 404, message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

// @desc Delete recipe
export const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return next({ statusCode: 404, message: "Recipe not found" });
    }
    res.json({ message: "Recipe removed" });
  } catch (err) {
    next(err);
  }
};
