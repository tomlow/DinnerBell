import SpoonacularClient from "../apiClient/SpoonacularClient.js"

class RecipeSerializer {
  static async getSummary(recipe) {
    const allowedAttributes = ["id", "title", "image", "missedIngredients"]

    let serializedRecipe = {}

    for (const attribute of allowedAttributes) {
      serializedRecipe[attribute] = recipe[attribute]
    }
    debugger
    const recipeSummary = SpoonacularClient.getRecipeSummary(recipe.id)
    debugger
    serializedRecipe.summary = recipeSummary
    debugger
    return serializedRecipe
  }
}

export default RecipeSerializer