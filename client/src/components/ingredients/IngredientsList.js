import React, { useState, useEffect } from "react"

import IngredientListItem from "./IngredientListItem.js"

import IngredientForm from "./IngredientForm"

const IngredientsList = ({ inventory }) => {

  const [errors, setErrors] = useState([])

  const postIngredient = async (formPayload) => {
    const response = await fetch('/api/v1/ingredients', {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(formPayload)
    })
    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json()
        const newErrors = translateServerErrors(body.errors)
        return setErrors(newErrors)
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    }
    else {
      setErrors([])
    }
  }

  const inventoryList = inventory.map((ingredient, index) => {
    return <IngredientListItem key={index} ingredient={ingredient} />
  })

  return <div>
    <div className="ingredient-form-container text-center">
      <h1>Welcome to your pantry, Master Chef!</h1>
      <IngredientForm postIngredient={postIngredient} />
    </div>
    <div className="ingredient-list-container grid-x">
      <div className="ingredient-list large-12 cell">
        {inventoryList}
      </div>
    </div>
  </div>
}

export default IngredientsList