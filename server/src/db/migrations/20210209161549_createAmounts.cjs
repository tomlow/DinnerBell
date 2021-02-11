/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("amounts", table => {
    table.bigIncrements("id")
    table.bigInteger("userId").references("users.id").unsigned().index().notNullable()
    table.bigInteger("ingredientId").references("ingredients.id").unsigned().index().notNullable()
    table.string("unit").notNullable()
    table.bigInteger("quantity").notNullable()
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table.timestamp("updatedAt").defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("amounts")
}
