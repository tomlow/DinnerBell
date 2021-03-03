import express from "express"
import SpoonacularClient from "../../../apiClient/SpoonacularClient.js"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"

import RecipeDataProcesser from "../../../services/RecipeDataProcesser.js"

const recipesRouter = new express.Router()

recipesRouter.get("/", async (req, res) => {
  const ingredientList = req.query.ingredientList
  try {
    const recipeData = await SpoonacularClient.searchRecipeByIngredients(ingredientList)
    const recipeIds = recipeData.map(recipe => recipe.id).join(",")
    const recipeDataWithInformation = await SpoonacularClient.getRecipeInformationBulk(recipeIds)

    const recipesToReturn = RecipeDataProcesser.normalizeData(recipeData, recipeDataWithInformation)

    const serializedRecipeData = recipesToReturn.map(recipe => {
      return RecipeSerializer.getSummary(recipe)
    })

    res.status(200).json({ recipeData: serializedRecipeData })
  }
  catch (error) {
    res.status(500).json({ error: error })
  }
})

export default recipesRouter