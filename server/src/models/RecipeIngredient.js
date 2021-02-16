const Model = require('./Model.js')

class RecipeIngredient extends Model {
  static get tableName() {
    return "recipeIngredients"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "recipeId"],
      properties: {
        name: { type: "string" },
        recipeId: { type: ["string", "integer"] },
        amount: { type: ["string", "integer"] },
        unit: { type: ["string", "integer"] }
      }
    }
  }

  static get relationMappings() {
    const { Recipe } = require('./index.js')
    return {
      recipe: {
        relation: Model.BelongsToOneRelation,
        modelClass: Recipe,
        join: {
          from: "recipeIngredients.recipeId",
          to: "recipes.id"
        }
      }
    }
  }
}

module.exports = RecipeIngredient