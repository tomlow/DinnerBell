import express from "express"
import SpoonacularClient from "../../../apiClient/SpoonacularClient.js"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"

import Recipe from "../../../models/Recipe.js"
import MissedIngredient from "../../../models/MissedIngredient.js"
import UsedIngredient from "../../../models/UsedIngredient.js"
import RecipeIngredient from "../../../models/RecipeIngredient.js"
import Instruction from "../../../models/Instruction.js"

const recipesRouter = new express.Router()

recipesRouter.get("/", async (req, res) => {
  const ingredientList = req.query.ingredientList
  try {
    const recipeData = await SpoonacularClient.searchRecipeByIngredients(ingredientList)

    const recipesToReturn = []
    const recipeIds = recipeData.map(recipe => recipe.id).join(",")
    const recipeDataWithInformation = await SpoonacularClient.getRecipeInformationBulk(recipeIds)

    recipeDataWithInformation.forEach(recipeWithInformation => {
      recipeWithInformation.missedIngredients = recipeData[recipeDataWithInformation.indexOf(recipeWithInformation)].missedIngredients
      recipeWithInformation.usedIngredients = recipeData[recipeDataWithInformation.indexOf(recipeWithInformation)].usedIngredients
    })

    for (const recipe of recipeDataWithInformation) {
      if (recipe.instructions !== null && recipe.analyzedInstructions !== []) {
        if (recipesToReturn.length < 18) {
          recipesToReturn.push(recipe)
        }
      }
    }
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

recipesRouter.delete("/", async (req, res) => {
  try {
    const { id } = req.body
    await UsedIngredient.query().where("recipeId", id).delete()
    await MissedIngredient.query().where("recipeId", id).delete()
    await RecipeIngredient.query().where("recipeId", id).delete()
    await Instruction.query().where("recipeId", id).delete()
    await Recipe.query().findById(id).delete()
    const remainingRecipes = await Recipe.query()
    return res.status(201).json({ remainingRecipes: remainingRecipes })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
})

export default recipesRouter