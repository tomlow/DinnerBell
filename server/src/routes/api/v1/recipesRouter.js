import express from "express"
import SpoonacularClient from "../../../apiClient/SpoonacularClient.js"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"

const recipesRouter = new express.Router()

recipesRouter.get("/", async (req, res) => {
  const ingredientList = req.query.ingredientList
  try {
    const recipeData = await SpoonacularClient.searchRecipeByIngredients(ingredientList)

    const recipesWithInstructions = []

    for (const recipe of recipeData) {
      const recipeInformation = await SpoonacularClient.getRecipeInformation(recipe.id)
      if (recipeInformation.instructions !== null && recipeInformation.analyzedInstructions !== []) {
        if (recipesWithInstructions.length < 6) {
          recipeInformation.missedIngredients = recipe.missedIngredients
          recipeInformation.usedIngredients = recipe.usedIngredients
          recipesWithInstructions.push(recipeInformation)
        }
      }
    }

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

export default recipesRouter

  // const recipesRouter = new express.Router()


  // //worst case, see how these methods work. 

  // recipesRouter.get("/", async (req, res) => {

  //   let defaultClient = SpoonacularApi.ApiClient.instance;  
  //   // Configure API key authorization: apiKeyScheme
  //   let apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
  //   console.log(process.env.SPOONACULAR_API_KEY)
  //   apiKeyScheme.apiKey = process.env.SPOONACULAR_API_KEY;
  //   // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
  //   //apiKeyScheme.apiKeyPrefix = 'Token';

  //   let apiInstance = new SpoonacularApi.DefaultApi();
  //   let ingredients = `apples, flour, sugar`; // String | A comma-separated list of ingredients that the recipes should contain.
  //   let opts = {
  //     '_number': 10, // Number | The maximum number of recipes to return (between 1 and 100). Defaults to 10.  
  //     'limitLicense': true, // Boolean | Whether the recipes should have an open license that allows display with proper attribution.
  //     'ranking': 1, // Number | Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
  //     'ignorePantry': true // Boolean | Whether to ignore typical pantry items, such as water, salt, flour, etc.
  //   };

  //   apiInstance.searchRecipesByIngredients(ingredients, opts, (error, data, response) => {
  //     if (error) {
  //       console.error(error);  
  //     } else {
  //       console.log('API called successfully. Returned data: ' + data);  
  //     }
  //   });
  // try {

  //   res.status(200).json({ recipeData: recipeData })  
  // } catch (error) {
  //   res.status(500).json({ error: error })  
  // }
  // })



