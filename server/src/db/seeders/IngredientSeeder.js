import Ingredient from "../../models/Ingredient.js"
import User from "../../models/User.js"
class IngredientSeeder {
  static async seed() {
    const user = await User.query().findById(1)
    const ingredientData = [
      {
        name: "black beans",
        userId: user.id
      },
      {
        name: "tortillas",
        userId: user.id
      },
      {
        name: "bread",
        userId: user.id
      },
      {
        name: "hummus",
        userId: user.id
      },
      {
        name: "tomatoes",
        userId: user.id
      },
      {
        name: "cheddar cheese",
        userId: user.id
      },
      {
        name: "hot sauce",
        userId: user.id
      },
      {
        name: "onions",
        userId: user.id
      },
      {
        name: "red peppers",
        userId: user.id
      },
      {
        name: "lettuce",
        userId: user.id
      },
      {
        name: "cabbage",
        userId: user.id
      },
      {
        name: "cauliflower",
        userId: user.id
      },
      {
        name: "broccoli",
        userId: user.id
      },
      {
        name: "carrots",
        userId: user.id
      },
      {
        name: "bananas",
        userId: user.id
      },
      {
        name: "apples",
        userId: user.id
      },
      {
        name: "celery",
        userId: user.id
      },
      {
        name: "peanut butter",
        userId: user.id
      },
      {
        name: "jam",
        userId: user.id
      },
      {
        name: "brie",
        userId: user.id
      },
      {
        name: "crackers",
        userId: user.id
      },
      {
        name: "english muffins",
        userId: user.id
      },
      {
        name: "cereal",
        userId: user.id
      },
      {
        name: "coffee beans",
        userId: user.id
      },
      {
        name: "potatoes",
        userId: user.id
      },
      {
        name: "tomato paste",
        userId: user.id
      },
      {
        name: "pasta",
        userId: user.id
      },
    ]
    for (const singleIngredient of ingredientData) {
      const currentIngredient = await Ingredient.query().findOne({ name: singleIngredient.name })

      if (!currentIngredient) {
        await Ingredient.query().insert(singleIngredient)
      }
    }
  }
}

export default IngredientSeeder