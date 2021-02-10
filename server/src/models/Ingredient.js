const Model = require('./Model.js')

class Ingredient extends Model {
  static get tableName() {
    return "ingredients"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      }
    }
  }

  static get relationMappings() {
    const { Amount, User } = require('./index.js')
    return {
      amounts: {
        relation: Model.HasManyRelation,
        modelClass: Amount,
        join: {
          from: "ingredients.id",
          to: "amounts.ingredientId"
        }
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "ingredients.id",
          through: {
            from: "amounts.ingredientId",
            to: "amounts.userId",
          },
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Ingredient