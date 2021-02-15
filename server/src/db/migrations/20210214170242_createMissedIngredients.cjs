/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("missedIngredients", table => {
    table.bigIncrements("id")
    table.string("name")
    table.bigInteger("recipeId").unsigned().index().notNullable().references("recipes.id")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  knex.schema.dropTableIfExists("missedIngredients")
}
