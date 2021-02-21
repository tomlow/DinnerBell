import express from "express"

import User from "../../../models/User.js"
import Recipe from "../../../models/Recipe.js"
import UsedIngredient from "../../../models/UsedIngredient.js"
import MissedIngredient from "../../../models/MissedIngredient.js"
import RecipeIngredient from "../../../models/RecipeIngredient.js"
import Instruction from "../../../models/Instruction.js"

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

userRecipesRouter.delete("/", async (req, res) => {
  try {
    const { id } = req.body
    await UsedIngredient.query().where("recipeId", id).delete()
    await MissedIngredient.query().where("recipeId", id).delete()
    await RecipeIngredient.query().where("recipeId", id).delete()
    await Instruction.query().where("recipeId", id).delete()
    await Recipe.query().findById(id).delete()
    const remainingRecipes = await Recipe.query()
    const serializedRemainingRecipes = []

    for (const recipe of remainingRecipes) {
      const serializedRecipe = await UserRecipeSerializer.getSummary(recipe)
      serializedRemainingRecipes.push(serializedRecipe)
    }
    return res.status(201).json({ remainingRecipes: serializedRemainingRecipes })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
})


export default userRecipesRouter