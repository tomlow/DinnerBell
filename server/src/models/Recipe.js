const Model = require('./Model.js')

class Recipe extends Model {
  static get tableName() {
    return "recipes"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "userId"],
      properties: {
        title: { type: "string" },
        userId: { type: ["string", "integer"] },
        image: { type: "string" },
        readyInMinutes: { type: ["string", "integer"] },
        servings: { type: ["string", "integer"] },
        vegetarian: { type: ["string", "boolean"] },
        "vegan": { type: ["string", "boolean"] },
        "glutenFree": { type: ["string", "boolean"] },
        "dairyFree": { type: ["string", "boolean"] },
        "summary": { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const { User, UsedIngredient, MissedIngredient, RecipeIngredient, Instruction } = require('./index.js')
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "recipes.userId",
          to: "users.id"
        }
      },
      usedIngredients: {
        relation: Model.HasManyRelation,
        modelClass: UsedIngredient,
        join: {
          from: "recipes.id",
          to: "usedIngredients.recipeId"
        }
      },
      missedIngredients: {
        relation: Model.HasManyRelation,
        modelClass: MissedIngredient,
        join: {
          from: "recipes.id",
          to: "missedIngredients.recipeId"
        }
      },
      recipeIngredients: {
        relation: Model.HasManyRelation,
        modelClass: RecipeIngredient,
        join: {
          from: "recipes.id",
          to: "recipeIngredients.recipeId"
        }
      },
      instructions: {
        relation: Model.HasManyRelation,
        modelClass: Instruction,
        join: {
          from: "recipes.id",
          to: "instructions.recipeId"
        }
      }
    }
  }
}

module.exports = Recipe