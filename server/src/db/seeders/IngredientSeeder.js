import Ingredient from "../../models/Ingredient.js"
import User from "../../models/User.js"
class IngredientSeeder {
  static async seed() {
    const user = await User.query().findById(1)
    const ingredientData = [
      {
        name: "black beans",
        image: "black-beans.jpg",
        userId: user.id
      },
      {
        name: "corn",
        image: "corn.png",
        userId: user.id
      },
      {
        name: "avocados",
        image: "avocado.jpg",
        userId: user.id
      },
      {
        name: "cheddar",
        image: "cheddar-cheese.png",
        userId: user.id
      },
      {
        name: "tomatoes",
        image: "tomato.png",
        userId: user.id
      },
      {
        name: "spaghetti pasta",
        image: "spaghetti.jpg",
        userId: user.id
      },
      {
        name: "potatoes",
        image: "potatoes-yukon-gold.png",
        userId: user.id
      },
      {
        name: "shrimp",
        image: "shrimp.png",
        userId: user.id
      },
      {
        name: "flour tortillas",
        image: "flour-tortilla.jpg",
        userId: user.id
      },
      {
        name: "onions",
        image: "brown-onion.png",
        userId: user.id
      },
      {
        name: "chicken",
        image: "whole-chicken.jpg",
        userId: user.id
      },
      {
        name: "wasabi peas",
        image: "wasabi-peas.jpg",
        userId: user.id
      },
      {
        name: "salted butter",
        image: "butter.jpg",
        userId: user.id
      },
      {
        name: "garlic",
        image: "garlic.png",
        userId: user.id
      },
      {
        name: "olive oil",
        image: "olive-oil.jpg",
        userId: user.id
      }
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