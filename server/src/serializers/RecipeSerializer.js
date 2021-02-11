class RecipeSerializer {
  static async getSummary(recipe) {
    debugger
    const allowedAttributes = ["title", "image", "missedIngredients"]

    let serializedRecipe = {}

    for (const attribute of allowedAttributes) {
      serializedRecipe[attribute] = recipe[attribute]
    }
    debugger
    return serializedRecipe
  }
}

export default RecipeSerializer