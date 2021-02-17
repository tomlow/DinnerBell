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
  // let excludedIngredients;
  // if (req.query.excludedIngredients !== "") {
  //   excludedIngredients = req.query.excludedIngredients.split(", ")
  // }
  try {
    const recipeData = await SpoonacularClient.searchRecipeByIngredients(ingredientList)

    const recipesToReturn = []

    const recipeIds = recipeData.map(recipe => recipe.id).join(",")
    const recipeDataWithInformation = await SpoonacularClient.getRecipeInformationBulk(recipeIds)


    for (const recipe of recipeDataWithInformation) {
      if (recipe.instructions !== null && recipe.analyzedInstructions !== []) {
        // excludedIngredients.forEach(excludedIngredient => {

        //   recipeInformation.extendedIngredients.forEach(ingredient => {

        //     if (ingredient.name === excludedIngredient.name) {

        //       return
        //     } else 
        if (recipesToReturn.length < 18) {
          //fix this logic so you're actually excluding things, and so it won't break if you aren't
          recipe.missedIngredients = recipe.missedIngredients
          recipe.usedIngredients = recipe.usedIngredients
          recipesToReturn.push(recipe)
        }
        //   })
        // })
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

recipesRouter.get("/recipeById", async (req, res) => {
  const recipeId = req.query.recipeId
  try {
    const recipeInformation = await SpoonacularClient.getRecipeInformation(recipeId)
  } catch (error) {
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
        const { name } = missedIngredient
        await MissedIngredient.query().insert({ name, recipeId })
      }
    }

    for (const usedIngredient of usedIngredients) {
      const { name } = usedIngredient
      await UsedIngredient.query().insert({ name, recipeId })
    }

    for (const ingredient of ingredients) {
      const { name, unit, amount } = ingredient
      const integerAmount = amount * 100

      await RecipeIngredient.query().insert({ name, unit, amount: integerAmount, recipeId })

    }

    for (const instruction of instructions) {
      const { step } = instruction
      await Instruction.query().insert({ step, recipeId })
    }
    res.status(201).json()
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default recipesRouter