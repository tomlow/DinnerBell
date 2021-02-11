class RecipeSerializer {
  static async getSummary(recipe) {
    const allowedAttributes = ["id", "title", "image", "missedIngredients"]

    let serializedRecipe = {}

    for (const attribute of allowedAttributes) {
      serializedRecipe[attribute] = recipe[attribute]
    }
    return serializedRecipe
  }
}

export default RecipeSerializer