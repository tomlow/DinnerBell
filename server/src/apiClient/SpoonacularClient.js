import got from "got";
import dotenv from "dotenv"

dotenv.config()

const spoonacularApiKey = process.env.SPOONACULAR_API_KEY
class SpoonacularClient {
  static async searchRecipeByIngredients(ingredients) {
    try {
      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=1&ranking=2&apiKey=${spoonacularApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default SpoonacularClient;
