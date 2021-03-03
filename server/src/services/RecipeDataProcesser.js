import UsedIngredient from "../models/UsedIngredient.js"
import MissedIngredient from "../models/MissedIngredient.js"
import RecipeIngredient from "../models/RecipeIngredient.js"
import Instruction from "../models/Instruction.js"


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

  static async addIngredientsAndInstructions(recipeData, recipeId) {

    const { missedIngredients, usedIngredients, ingredients, instructions } = recipeData


    if (missedIngredients.length > 0) {
      for (const missedIngredient of missedIngredients) {
        const { name, image } = missedIngredient
        const newMissedIngredient = await MissedIngredient.query().insert({ name, image, recipeId })
      }
    }

    for (const usedIngredient of usedIngredients) {
      const { name } = usedIngredient
      const newUsedIngredient = await UsedIngredient.query().insert({ name, recipeId })
    }

    for (const ingredient of ingredients) {
      const { name, unit, amount } = ingredient
      const integerAmount = (amount * 100).toFixed(0)
      const newRecipeIngredient = await RecipeIngredient.query().insert({ name, unit, amount: integerAmount, recipeId })

    }

    for (const instruction of instructions) {
      const { step } = instruction
      const newInstruction = await Instruction.query().insert({ step, recipeId })
    }

  }
}
export default RecipeDataProcesser