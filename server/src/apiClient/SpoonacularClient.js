import got from "got";
import dotenv from "dotenv"

dotenv.config()

const spoonacularApiKey = process.env.SPOONACULAR_API_KEY

class SpoonacularClient {
  static async searchRecipeByIngredients(ingredients) {
    try {
      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=25&ranking=2&apiKey=${spoonacularApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      const parsedBody = JSON.parse(responseBody)
      return parsedBody;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getRecipeSummary(recipeId) {
    try {
      const url = `https://api.spoonacular.com/recipes/${recipeId}/summary?apiKey=${spoonacularApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      const parsedBody = JSON.parse(responseBody)
      return parsedBody
    } catch (error) {
      return { error: error.message }
    }
  }

  static async getRecipeInformation(recipeId) {
    try {
      const url = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${spoonacularApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      const parsedBody = JSON.parse(responseBody)
      return parsedBody
    } catch (error) {
      return { error: error.message }
    }
  }

  static async getRecipeInformationBulk(recipeIds) {
    try {
      const url = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}&includeNutrition=false&apiKey=${spoonacularApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      const parsedBody = JSON.parse(responseBody)
      return parsedBody
    } catch (error) {
      return { error: error.message }
    }
  }

  static async autoCompleteByString(queryString) {
    try {
      const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${queryString}&number=10&apiKey=${spoonacularApiKey}`
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      const parsedBody = JSON.parse(responseBody)
      return parsedBody
    } catch (error) {
      return { error: error.message }
    }
  }
}

export default SpoonacularClient;