import express from "express"
import User from "../../../models/User.js"
const userRecipesRouter = new express.Router()

userRecipesRouter.get('/', async (req, res) => {
  try {
    const userId = req.user.id
    const user = User.query().findById(userId)
    userRecipes = user.$relatedQuery("recipes")
    res.status(200).json({ recipeData: userRecipes })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default userRecipesRouter