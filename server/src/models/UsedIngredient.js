const Model = require('./Model.js')

class UsedIngredient extends Model {
  static get tableName() {
    return "usedIngredients"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "recipeId"],
      properties: {
        name: { type: "string" },
        recipeId: { type: ["string", "integer"] }
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
          from: "usedIngredients.recipeId",
          to: "recipes.id"
        }
      }
    }
  }
}

module.exports = UsedIngredient