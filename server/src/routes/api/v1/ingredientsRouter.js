import express from "express"
import cleanUserInput from "../../../services/cleanUserInput.js"
import Ingredient from "../../../models/Ingredient.js"
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

ingredientsRouter.get('/:ingredientId', async (req, res) => {
  try {
    const ingredientId = req.params.ingredientId
    const ingredient = await Ingredient.query().findById(ingredientId)

    res.status(200).json({ ingredient: ingredient })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

ingredientsRouter.post("/", async (req, res) => {
  try {
    const { body } = req
    const formInput = cleanUserInput(body)
    const { name } = formInput
    const userId = req.user.id
    const newIngredient = await Ingredient.query().insertAndFetch({ name, userId })
    return res.status(201).json({ ingredient: newIngredient })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

ingredientsRouter.patch("/:id", async (req, res) => {
  try {
    const { body } = req
    const formInput = cleanUserInput(body)
    const { name } = formInput
    const { id } = req.params

    await Ingredient.query().findById(id).patch({ name: name })

    return res.status(201).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

ingredientsRouter.delete("/:ingredientId", async (req, res) => {
  try {
    const { ingredientId } = req.params
    await Ingredient.query().findById(ingredientId).delete()
    return res.status(201).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

export default ingredientsRouter