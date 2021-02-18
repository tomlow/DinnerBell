// import SpoonacularClient from "../apiClient/SpoonacularClient.js"

class RecipeSerializer {
  static getSummary(recipe) {
    const allowedAttributes = [
      "id",
      "title",
      "image",
      "missedIngredients",
      "usedIngredients",
      "analyzedInstructions",
      "extendedIngredients",
      "readyInMinutes",
      "servings",
      "vegetarian",
      "vegan",
      "glutenFree",
      "dairyFree",
      "summary"
    ]

    let serializedRecipe = {}

    for (const attribute of allowedAttributes) {
      if (attribute === "extendedIngredients") {
        serializedRecipe.ingredients = recipe[attribute]
      }

      if (attribute === "analyzedInstructions") {
        serializedRecipe.instructions = recipe[attribute][0].steps
      }

      else serializedRecipe[attribute] = recipe[attribute]
    }

    return serializedRecipe
  }
}

export default RecipeSerializer