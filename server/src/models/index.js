// include all of your models here using CommonJS requires
const User = require("./User.js")
const Ingredient = require("./Ingredient.js")
const Recipe = require("./Recipe.js")
const UsedIngredient = require("./UsedIngredient.js")
const MissedIngredient = require("./MissedIngredient.js")
const RecipeIngredient = require("./RecipeIngredient.js")
const Instruction = require("./Instruction.js")

module.exports = { User, Ingredient, Recipe, UsedIngredient, MissedIngredient, RecipeIngredient, Instruction };
