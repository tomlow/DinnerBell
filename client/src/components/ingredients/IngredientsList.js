import React, { useState } from "react"
import _ from "lodash"
import { message } from "antd"
import IngredientListItem from "./IngredientListItem.js"
import IngredientForm from "./IngredientForm"

const IngredientsList = ({ inventory, setInventory, currentUser, myStorage }) => {
  const [errors, setErrors] = useState([])

  const warning = () => {
    message.warning('You already have this ingredient!')
  }

  const emptyWarning = () => {
    message.warning('Enter an ingredient first!')
  }

  const ingredientNames = inventory.map(item => {
    return item.name
  })

  const postIngredient = async (formPayload) => {
    if (ingredientNames.includes(formPayload.name)) {
      return warning()
    }

    if (formPayload.name === "") {
      return emptyWarning()
    }

    if (!currentUser) {
      const ingredientDataJSON = JSON.stringify([...inventory, formPayload])
      myStorage.setItem("ingredientData", ingredientDataJSON)
      return setInventory([...inventory, formPayload])
    }

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
      const responseBody = await response.json()
      const newIngredient = responseBody.newIngredient
      setErrors([])
      setInventory([...inventory, newIngredient])
    }
  }

  const deleteIngredient = async (ingredientPayload) => {
    if (!currentUser) {
      const toDelete = inventory.find(ingredient => ingredient.name === ingredientPayload.name)
      const deleteIdx = inventory.indexOf(toDelete)
      inventory.splice(deleteIdx, 1)
      return setInventory([...inventory])
    }

    try {
      const response = await fetch(`/api/v1/ingredients/${ingredientPayload.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(ingredientPayload),
      })
      const responseBody = await response.json()
      const remainingIngredients = responseBody.remainingIngredients
      setInventory(remainingIngredients)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const inventoryList = inventory.map((ingredient, index) => {
    return <IngredientListItem key={index} ingredient={ingredient} deleteIngredient={deleteIngredient} currentUser={currentUser} />
  })

  return <div>
    <div className="ingredient-form-container text-center">
      <h1>Welcome to your pantry, Master Chef!</h1>
      <IngredientForm postIngredient={postIngredient} />
    </div>
    <div className={inventory.length > 0 ? "ingredient-list-container grid-x" : ""}>
      <div className="ingredient-list large-12 cell">
        {inventoryList}
      </div>
    </div>
  </div>
}

export default IngredientsList