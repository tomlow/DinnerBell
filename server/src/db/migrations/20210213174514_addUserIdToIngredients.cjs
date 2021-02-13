/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("ingredients", table => {
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("ingredients", table => {
    table.dropColumn("userId")
  })
}
