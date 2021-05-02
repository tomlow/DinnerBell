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

userRecipesRouter.post("/", async (req, res) => {
  const userId = req.user.id
  const recipeData = req.body
  const { title, summary, image, missedIngredients, usedIngredients, ingredients, instructions, glutenFree, dairyFree, vegan, vegetarian, readyInMinutes, servings } = recipeData
  try {
    const currentUser = await User.query().findById(userId)
    const userRecipes = await currentUser.$relatedQuery("recipes")
    const currentRecipe = userRecipes.find(recipe => recipe.summary === summary)
    if (currentRecipe) {
      throw error
    }
    const newRecipe = await Recipe.query().insertAndFetch({ title, summary, image, glutenFree, dairyFree, vegan, vegetarian, readyInMinutes, servings, userId })

    const recipeId = newRecipe.id

    if (missedIngredients.length > 0) {
      for (const missedIngredient of missedIngredients) {
        const { name, image } = missedIngredient
        const newMissedIngredient = await MissedIngredient.query().insert({ name, image, recipeId })
      }
    }

    for (const usedIngredient of usedIngredients) {
      const { name } = usedIngredient
      const newUsedIngredient = await UsedIngredient.query().insert({ name, recipeId })
    }

    for (const ingredient of ingredients) {
      const { name, unit, amount } = ingredient
      const integerAmount = (amount * 100).toFixed(0)
      const newRecipeIngredient = await RecipeIngredient.query().insert({ name, unit, amount: integerAmount, recipeId })

    }

    for (const instruction of instructions) {
      const { step } = instruction
      const newInstruction = await Instruction.query().insert({ step, recipeId })
    }

    res.status(201).json()
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

userRecipesRouter.delete("/", async (req, res) => {
  try {
    const { id } = req.body
    const userId = req.user.id
    const user = await User.query().findById(userId)

    await UsedIngredient.query().where("recipeId", id).delete()
    await MissedIngredient.query().where("recipeId", id).delete()
    await RecipeIngredient.query().where("recipeId", id).delete()
    await Instruction.query().where("recipeId", id).delete()
    await Recipe.query().findById(id).delete()

    const remainingRecipes = await user.$relatedQuery("recipes")
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