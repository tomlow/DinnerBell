import express from "express"
import SpoonacularClient from "../../../apiClient/SpoonacularClient.js"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"
import userRecipesRouter from "./userRecipesRouter.js"

import Recipe from "../../../models/Recipe.js"
import MissedIngredient from "../../../models/MissedIngredient.js"
import UsedIngredient from "../../../models/UsedIngredient.js"
import RecipeIngredient from "../../../models/RecipeIngredient.js"
import Instruction from "../../../models/Instruction.js"
import IngredientDeleteForm from "../../../../../client/src/components/ingredients/IngredientDeleteForm.js"

const recipesRouter = new express.Router()

recipesRouter.use('/userRecipes', userRecipesRouter)

recipesRouter.get("/", async (req, res) => {
  const ingredientList = req.query.ingredientList


  // let excludedIngredients;
  // if (req.query.excludedIngredients !== "") {
  //   excludedIngredients = req.query.excludedIngredients.split(", ")
  // }
  try {
    const recipeData = await SpoonacularClient.searchRecipeByIngredients(ingredientList)

    const recipesWithInstructions = []

    for (const recipe of recipeData) {
      const recipeInformation = await SpoonacularClient.getRecipeInformation(recipe.id)
      if (recipeInformation.instructions !== null && recipeInformation.analyzedInstructions !== []) {
        // excludedIngredients.forEach(excludedIngredient => {

        //   recipeInformation.extendedIngredients.forEach(ingredient => {

        //     if (ingredient.name === excludedIngredient.name) {

        //       return
        //     } else 
        if (recipesWithInstructions.length < 18) {
          //fix this logic so you're actually excluding things, and so it won't break if you aren't
          recipeInformation.missedIngredients = recipe.missedIngredients
          recipeInformation.usedIngredients = recipe.usedIngredients
          recipesWithInstructions.push(recipeInformation)
        }
        //   })
        // })
      }
    }
    debugger
    const serializedRecipeData = recipesWithInstructions.map(recipe => {
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


    //you could get the ingredients, query recipes, for each of them, query by name to get only those that return instructions, if they return instructions, push them to a new array so that you get only instruction recipes. If that's possible and you still get recipes, great. If not, just have an optional instructions section. 

    //big challenge still comparing ingredients. 

    //might have to do an ingredient query again. Hmm. Not really properly namespaced. Try to figure out how to do the missed ingredients thing. Anyway. Then the show page'll be mostly there. Push and save. Then do the profile page. Hmm. Might have to do some refactoring re: calling the info. NO! Just configure the save button to have CRUD functionality. Then you're gold. Query that. Send the recipe info you've got on the card. Then link to the same show page. Make the CSS grey out thing. Then it's just styling and proper add/edit/delete for ingredients. 

    //query for title, missedIngredients, usedIngredients, steps, summary, etc. If you get this done, then you'll be able to refactor it tomorrow, get the profile page up and running, and move on to the edit and delete functions of list items. Then it's just some styling and you pretty much have a functional MVP. Ideally get the cool extras on the show page and the amounts in there. Then the shopping list feature can finally emerge. Cool. Cool. Cool. A clear path to success. 
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

recipesRouter.post("/", async (req, res) => {
  const userId = req.user.id
  const recipeData = req.body
  const recipeId = recipeData.id
  const { title, summary, image, missedIngredients, usedIngredients, extendedIngredients, analyzedInstructions, glutenFree, dairyFree, vegan, vegetarian, readyInMinutes, servings } = recipeData
  debugger
  try {
    await Recipe.query().insert({ title, summary, image, glutenFree, dairyFree, vegan, vegetarian, readyInMinutes, servings, userId })

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

    //finish filling out this router stuff. Then set up the profile page. Then I think you're set to take a walk through the site, or to start big on styling. 

    //Don't like the state reset issue on ingredientslist. Probably want to rename/rearrange some components. Okay. Commit and call it for the night. 
  } catch (error) {

  }
})

//this is where you query and insert different pieces of the data into the databases, running for each loops on the ingredients to insert them. You just gotta make sure you have the relations set up, so that they're properly associated for the get later. 

export default recipesRouter