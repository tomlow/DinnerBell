/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("instructions", table => {
    table.bigIncrements("id")
    table.string("step")
    table.bigInteger('recipeId').notNullable().index().unsigned().references('recipes.id')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => { return knex.schema.dropTableIfExists("instructions") }
