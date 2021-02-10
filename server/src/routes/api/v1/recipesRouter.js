import express from "express"
import SpoonacularClient from "../../../apiClient/SpoonacularClient.js"

const recipesRouter = new express.Router()

recipesRouter.get("/", async (req, res) => {
  const ingredientList = req.query.ingredientList
  try {
    const recipeData = await SpoonacularClient.getRecipeByIngredients(ingredientList)
    res.status(200).json({ recipeData: recipeData })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default recipesRouter