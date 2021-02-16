/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("recipes", table => {
    table.bigIncrements("id")
    table.string("title").notNullable()
    table.string("image")
    table.bigInteger("readyInMinutes")
    table.bigInteger("servings")
    table.boolean("vegetarian")
    table.boolean('vegan')
    table.boolean("glutenFree")
    table.boolean("dairyFree")
    table.text("summary")
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table.timestamp("updatedAt").defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("recipes")
}
