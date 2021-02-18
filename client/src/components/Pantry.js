import React, { useState, useEffect } from "react"
import _ from "lodash"

import IngredientsList from "./ingredients/IngredientsList.js"
import RecipeDisplay from "./recipes/RecipeDisplay.js"

const Pantry = (props) => {
  const [inventory, setInventory] = useState([])
  const [recipes, setRecipes] = useState([])

  const myStorage = window.sessionStorage

  if (myStorage.getItem("recipeData") !== null && recipes.length === 0) {
    const recipeDataParsed = JSON.parse(myStorage.getItem("recipeData"))
    setRecipes(recipeDataParsed)
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
    fetchInventory()
  }, [])

  const queryByIngredients = async () => {
    try {
      const ingredientQueryString = inventory.map(ingredient => ingredient.name).join(",")

      const response = await fetch(`/api/v1/recipes/?ingredientList=${ingredientQueryString}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage);
        throw (error);
      }
      const responseBody = await response.json()
      const recipeData = responseBody.recipeData
      myStorage.clear()
      const recipeDataJSON = JSON.stringify(recipeData)
      myStorage.setItem("recipeData", recipeDataJSON)
      setRecipes(recipeData)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  }

  return <div>
    <IngredientsList inventory={inventory} />
    <RecipeDisplay queryByIngredients={queryByIngredients} recipes={recipes} />
  </div>
}

export default Pantry