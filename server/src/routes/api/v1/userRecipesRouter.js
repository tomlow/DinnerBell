import express from "express"
import User from "../../../models/User.js"

import UserRecipeSerializer from "../../../serializers/UserRecipeSerializer.js"

const userRecipesRouter = new express.Router()

userRecipesRouter.get('/', async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.query().findById(userId)
    const userRecipes = await user.$relatedQuery("recipes")
    const serializedRecipes = []

    for (const recipe of userRecipes) {
      const serializedRecipe = await UserRecipeSerializer.getSummary(recipe)
      serializedRecipes.push(serializedRecipe)
    }
    res.status(200).json({ recipeData: serializedRecipes })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default userRecipesRouter