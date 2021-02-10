import express from "express"

import SpoonacularClient from "../../../apiClient/SpoonacularClient.js";

const ingredientsRouter = new express.Router()

ingredientsRouter.get('/', async (req, res) => {
  const user = req.user
  try {
    let userAmounts = await user.$relatedQuery("amounts")

    const userAmountsAndIngredients = []

    for (const amount of userAmounts) {
      const ingredient = await amount.$relatedQuery('ingredient')
      let { unit, quantity, id } = amount
      let amountAndIngredient = { unit, quantity, amountId: id }
      amountAndIngredient.ingredientName = ingredient.name
      amountAndIngredient.ingredientId = ingredient.id
      userAmountsAndIngredients.push(amountAndIngredient)
    }




    SpoonacularClient.getRecipeByIngredients([{ name: "bananas" }, { name: "peanut butter" }]).then((data) => {
      if (data.error) {
        console.log(`Error from Open Weather: ${data.error}`);
      } else {
        const parsedResponse = JSON.parse(data);
        res
          .set({ "Content-Type": "application/json" })
          .status(200)
          .json({ weatherForecast: parsedResponse });
      }
    });

    res.status(200).json({ userAmountsAndIngredients: userAmountsAndIngredients })

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default ingredientsRouter