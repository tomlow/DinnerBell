import React, { useState, useEffect } from "react"
import { message } from "antd"
import _ from "lodash"
import IngredientsList from "./ingredients/IngredientsList.js"
import RecipeDisplay from "./recipes/RecipeDisplay.js"

const Pantry = ({ currentUser }) => {
  const [inventory, setInventory] = useState([])
  const [recipes, setRecipes] = useState([])
  const [ingredientsPresent, setIngredientsPresent] = useState([false])

  const myStorage = window.sessionStorage

  if (currentUser && myStorage.getItem("userData")) {
    if (myStorage.getItem("recipeData") !== null && JSON.parse(myStorage.getItem("userData")).id === currentUser.id && recipes.length === 0) {
      const recipeDataParsed = JSON.parse(myStorage.getItem("recipeData"))
      setRecipes(recipeDataParsed)
    }
  }
  if (myStorage.getItem("recipeData") !== null && recipes.length === 0) {
    const recipeDataParsed = JSON.parse(myStorage.getItem("recipeData"))
    console.log("I'm running")
    setIngredientsPresent([!ingredientsPresent[0]])
    setRecipes(recipeDataParsed)
  }

  const warning = () => {
    message.warning('No ingredients to search by!')
  }

  const loading = () => {
    message.loading("Gathering cookbooks...", 1.5)
      .then(() => message.loading("Flipping through the pages...", 1.5))
      .then(() => message.success('Aha, these look delicious!', 1.5))
      .then(() => message.info('Take a look at what we\'ve found below', 1.5))
  }

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/v1/ingredients')
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const responseBody = await response.json()
      const inventory = responseBody.ingredients
      setInventory(inventory)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    if (!currentUser && myStorage.getItem("ingredientData") !== null) {
      const ingredientData = JSON.parse(myStorage.getItem("ingredientData"))
      console.log(inventory)
      console.log(ingredientData)
      setInventory([...inventory, ingredientData])
    } else if (currentUser) {
      fetchInventory()
    }
  }, ingredientsPresent)

  const queryByIngredients = async () => {
    if (inventory.length === 0) {
      return warning()
    }
    loading()
    try {
      const ingredientQueryString = inventory.map(ingredient => ingredient.name).join(",")

      const response = await fetch(`/api/v1/recipes/?ingredientList=${ingredientQueryString}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const responseBody = await response.json()
      const recipeData = responseBody.recipeData
      myStorage.clear()
      const recipeDataJSON = JSON.stringify(recipeData)
      myStorage.setItem("recipeData", recipeDataJSON)
      if (currentUser) {
        const currentUserJSON = JSON.stringify(currentUser)
        myStorage.setItem("userData", currentUserJSON)
      }
      setRecipes(recipeData)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  return <div className="pantry-container">
    <IngredientsList inventory={inventory} setInventory={setInventory} currentUser={currentUser} myStorage={myStorage} />
    <RecipeDisplay queryByIngredients={queryByIngredients} recipes={recipes} currentUser={currentUser} />
  </div>
}

export default Pantry