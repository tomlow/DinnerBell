// import SpoonacularClient from "../apiClient/SpoonacularClient.js"

class RecipeSerializer {
  static getSummary(recipe) {
    const allowedAttributes = ["id", "title", "image", "missedIngredients", "summary"]

    let serializedRecipe = {}

    for (const attribute of allowedAttributes) {
      serializedRecipe[attribute] = recipe[attribute]
    }
    // const recipeSummary = await SpoonacularClient.getRecipeSummary(recipe.id)
    // serializedRecipe.summary = recipeSummary
    return serializedRecipe
  }
}

export default RecipeSerializer