import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import _ from "lodash"

import RecipeTile from "../recipes/RecipeTile.js"

import IngredientForm from "./IngredientForm"
const IngredientsList = (props) => {

  const [inventory, setInventory] = useState([])
  const [recipes, setRecipes] = useState([])
  const [excludedIngredients, setExcludedIngredients] = useState("")

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

  const editIngredient = async (ingredientId) => {
    try {
      const response = await fetch(`/api/v1/ingredients/${ingredientId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(ingredientId),
      })
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const deleteIngredient = async (ingredientId) => {
    try {
      const response = await fetch(`/api/v1/ingredients/${ingredientId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(ingredientId),
      })
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  //create edit and delete functionality for ingredients. 

  const inventoryList = inventory.map((ingredient, index) => {
    return (
      <li key={index}>{ingredient.name}
        <Link className="button" to={`/ingredients/edit/${ingredient.id}`}>
          Edit
        </Link>
        <Link className="button" to={`/ingredients/delete/${ingredient.id}`}>
          Remove
        </Link>
      </li>
    )
  })

  const ingredientList = inventory.map(ingredient => {
    return ingredient.name
  }).join(",")

  const onClickHandler = async () => {
    try {
      const response = await fetch(`/api/v1/recipes/?ingredientList=${ingredientList}&excludedIngredients=${excludedIngredients}`)
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

  const onChangeHandler = (event) => {
    setExcludedIngredients(event.currentTarget.value)
    console.log(excludedIngredients)
  }

  let recipeDisplay = "" //set this up to have a loading page. 

  if (!_.isEmpty(recipes)) {
    recipeDisplay = <div className="tile-container">{recipes.map((recipe, index) => {
      return <RecipeTile key={index} recipe={recipe} />
    })}</div>
  }


  return <div>
    <IngredientForm />
    <h1 className="text-center">
      You're Working With <br />
      -------------------
    </h1>
    <ul>
      {inventoryList}
    </ul>
    <label>Anything you don't want to cook with? List it here!
      <input type="text" id="excludedIngredients" name="excludedIngredients" value={excludedIngredients} onChange={onChangeHandler} />
    </label>
    <div>
      <button className="button" onClick={onClickHandler}>What's for Dinner?</button>
    </div>
    {recipeDisplay}
  </div>
}

export default IngredientsList