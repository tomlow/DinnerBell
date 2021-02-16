/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("instructions", table => {
    table.bigIncrements("id")
    table.text("step")
    table.bigInteger('recipeId').notNullable().index().unsigned().references('recipes.id')
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table.timestamp("updatedAt").defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => { return knex.schema.dropTableIfExists("instructions") }
