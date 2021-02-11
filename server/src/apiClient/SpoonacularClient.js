import got from "got";


// if (config.nodeEnv === "development") {
//   import dotenv from "dotenv"
//   dotenv.config()
// }

const spoonacularApiKey = process.env.SPOONACULAR_API_KEY
class SpoonacularClient {
  static async searchRecipeByIngredients(ingredients) {
    try {
      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=6&ranking=2&apiKey=${spoonacularApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      const parsedBody = JSON.parse(responseBody)
      return parsedBody;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default SpoonacularClient;
