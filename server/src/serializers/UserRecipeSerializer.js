class UserRecipeSerializer {
  static async getSummary(recipe) {
    const allowedAttributes = [
      "id",
      "title",
      "image",
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
      serializedRecipe[attribute] = recipe[attribute]
    }

    serializedRecipe.missedIngredients = await recipe.$relatedQuery("missedIngredients")
    serializedRecipe.usedIngredients = await recipe.$relatedQuery("usedIngredients")
    serializedRecipe.extendedIngredients = await recipe.$relatedQuery("recipeIngredients")
    for (const ingredient of serializedRecipe.extendedIngredients) {
      ingredient.amount = ingredient.amount / 100
    }
    serializedRecipe.instructions = await recipe.$relatedQuery("instructions")
    debugger
    return serializedRecipe
  }
}

export default UserRecipeSerializer