import express from "express"
import cleanUserInput from "../../../services/cleanUserInput.js"
const ingredientsRouter = new express.Router()

ingredientsRouter.get('/', async (req, res) => {
  const user = req.user
  try {
    let userIngredients = await user.$relatedQuery("ingredients")

    // const userAmountsAndIngredients = []

    // for (const amount of userAmounts) {
    //   const ingredient = await amount.$relatedQuery('ingredient')
    //   let { unit, quantity, id } = amount
    //   let amountAndIngredient = { unit, quantity, amountId: id }
    //   amountAndIngredient.ingredientName = ingredient.name
    //   amountAndIngredient.ingredientId = ingredient.id
    //   userAmountsAndIngredients.push(amountAndIngredient)
    // }

    res.status(200).json({ ingredients: userIngredients })

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

ingredientsRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { name } = formInput
  try {

  } catch (error) {

  }
})

export default ingredientsRouter