const Model = require('./Model.js')

class Ingredient extends Model {
  static get tableName() {
    return "ingredients"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "userId"],
      properties: {
        name: { type: "string" },
        image: { type: "string" },
        userId: { type: ["string", "integer"] }
      }
    }
  }

  static get relationMappings() {
    const { User } = require('./index.js')
    return {
      // amounts: {
      //   relation: Model.HasManyRelation,
      //   modelClass: Amount,
      //   join: {
      //     from: "ingredients.id",
      //     to: "amounts.ingredientId"
      //   }
      // },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "ingredients.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Ingredient