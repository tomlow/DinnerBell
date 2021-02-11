import express from "express"
import SpoonacularClient from "../../../apiClient/SpoonacularClient.js"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"
// import SpoonacularApi from 'spoonacular_api';
// import dotenv from "dotenv"
// dotenv.config()

const recipesRouter = new express.Router()

recipesRouter.get("/", async (req, res) => {
  const ingredientList = req.query.ingredientList
  try {
    debugger
    const recipeData = await SpoonacularClient.searchRecipeByIngredients(ingredientList)
    console.log(recipeData[0]) //why is the recipedata behaving this way? get it up, style that and tge homepage. Save to a userRecipes database. Create a profile page for the current user. That's it. Then try to create some features with better recipe details, sorting, even some way to manage inventory. 
    debugger
    const serializedRecipeData = []

    for (const recipe of recipeData) {
      debugger
      serializedRecipeData.push(RecipeSerializer.getSummary(recipe))
    }
    debugger
    res.status(200).json({ recipeData: serializedRecipeData })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// export default recipesRouter

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



export default recipesRouter


