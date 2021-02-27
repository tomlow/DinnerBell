import express from "express"
import SpoonacularClient from "../../../apiClient/SpoonacularClient.js"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"

import Recipe from "../../../models/Recipe.js"
import MissedIngredient from "../../../models/MissedIngredient.js"
import UsedIngredient from "../../../models/UsedIngredient.js"
import RecipeIngredient from "../../../models/RecipeIngredient.js"
import Instruction from "../../../models/Instruction.js"

import RecipeDataProcesser from "../../../services/RecipeDataProcesser.js"

const recipesRouter = new express.Router()

recipesRouter.get("/", async (req, res) => {
  const ingredientList = req.query.ingredientList
  try {
    const recipeData = await SpoonacularClient.searchRecipeByIngredients(ingredientList)
    const recipeIds = recipeData.map(recipe => recipe.id).join(",")
    const recipeDataWithInformation = await SpoonacularClient.getRecipeInformationBulk(recipeIds)

    const recipesToReturn = RecipeDataProcesser.normalizeData(recipeData, recipeDataWithInformation)
    debugger
    const serializedRecipeData = recipesToReturn.map(recipe => {
      return RecipeSerializer.getSummary(recipe)
    })

    res.status(200).json({ recipeData: serializedRecipeData })
  }
  catch (error) {
    res.status(500).json({ error: error })
  }
})

recipesRouter.post("/", async (req, res) => {
  const userId = req.user.id
  const recipeData = req.body
  const { title, summary, image, missedIngredients, usedIngredients, ingredients, instructions, glutenFree, dairyFree, vegan, vegetarian, readyInMinutes, servings } = recipeData
  try {
    const currentRecipe = await Recipe.query().findOne({ summary: summary })
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

export default recipesRouter