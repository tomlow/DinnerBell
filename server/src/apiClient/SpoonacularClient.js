import got from "got";

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
      const url = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=22e2df9ed493453292c7c9a10787439e`;
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