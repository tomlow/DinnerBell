// const Model = require('./Model.js')

// class Amount extends Model {
//   static get tableName() {
//     return "amounts"
//   }

//   static get jsonSchema() {
//     return {
//       type: "object",
//       required: ["ingredientId", "userId", "unit", "quantity"],
//       properties: {
//         ingredientId: ["string", "integer"],
//         userId: ["string", "integer"],
//         unit: ["string"],
//         quantity: ["string", "integer"]
//       }
//     }
//   }
//   static get relationMappings() {
//     const { User, Ingredient } = require("./index.js")
//     return {
//       ingredient: {
//         relation: Model.BelongsToOneRelation,
//         modelClass: Ingredient,
//         join: {
//           from: "amounts.ingredientId",
//           to: "ingredients.id"
//         }
//       },
//       user: {
//         relation: Model.BelongsToOneRelation,
//         modelClass: User,
//         join: {
//           from: "amounts.userId",
//           to: "users.id"
//         }
//       }
//     }
//   }
// }

// module.exports = Amount