class RecipeDataProcesser {
  static normalizeData(recipeData, recipeDataWithInformation) {

    const recipesToReturn = [];

    recipeDataWithInformation.forEach(recipeWithInformation => {
      recipeWithInformation.missedIngredients = recipeData[recipeDataWithInformation.indexOf(recipeWithInformation)].missedIngredients
      recipeWithInformation.usedIngredients = recipeData[recipeDataWithInformation.indexOf(recipeWithInformation)].usedIngredients
    })

    for (const recipe of recipeDataWithInformation) {
      if (recipe.instructions !== null && recipe.analyzedInstructions !== []) {
        if (recipesToReturn.length < 18) {
          recipesToReturn.push(recipe)
        }
      }
    }
    return recipesToReturn
  }
}
export default RecipeDataProcesser