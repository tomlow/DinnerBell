import React, { useState, useEffect } from "react"
import _ from "lodash"

import RecipeTile from "../recipes/RecipeTile.js"

import IngredientForm from "./IngredientForm"
const IngredientsList = (props) => {

  const [inventory, setInventory] = useState([])
  const [recipes, setRecipes] = useState([])

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/v1/ingredients')
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const responseBody = await response.json()
      const inventory = responseBody.userAmountsAndIngredients
      setInventory(inventory)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  const inventoryList = inventory.map(amountAndIngredient => {
    return (<li key={amountAndIngredient.amountId}>
      {amountAndIngredient.quantity} {amountAndIngredient.unit} {amountAndIngredient.ingredientName}
    </li>
    )
  })

  const ingredientList = inventory.map(amountAndIngredient => {
    return amountAndIngredient.ingredientName
  }).join(",")

  const onClickHandler = async (props) => {
    try {
      const response = await fetch(`/api/v1/recipes/?ingredientList=${ingredientList}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage);
        throw (error);
      }
      const responseBody = await response.json()
      const recipeData = responseBody.recipeData
      setRecipes(recipeData)

    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }

    //Dream feature: have a filter you could use to display only certain recipes. Like, check off dietary restrictions, etc.  
  }

  let recipeDisplay = "" //set this up to have a loading page. 

  if (!_.isEmpty(recipes)) {
    recipeDisplay = <div className="tile-container">{recipes.map(recipe => {
      return <RecipeTile recipe={recipe} />
    })}</div>
  }

  const recipeButton = <div>
    <button className="button" onClick={onClickHandler}>What's for Dinner?</button>
  </div>

  return <div>
    <IngredientForm />
    <h1 className="text-center">
      You're Working With <br />
      -------------------
    </h1>
    <ul>
      {inventoryList}
    </ul>
    {recipeButton}
    {recipeDisplay}
  </div>
}

export default IngredientsList