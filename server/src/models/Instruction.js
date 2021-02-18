const Model = require('./Model.js')

class Instruction extends Model {
  static get tableName() {
    return "instructions"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["step", "recipeId"],
      properties: {
        step: { type: "string" },
        recipeId: { type: ["string", "integer"] },
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
          from: "instructions.recipeId",
          to: "recipes.id"
        }
      }
    }
  }
}

module.exports = Instruction