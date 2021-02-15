import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

const IngredientDeleteForm = (props) => {
  const [ingredientRecord, setIngredientRecord] = useState({
    name: "",
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { id: ingredientId } = props.match.params

  const fetchIngredient = async () => {
    try {
      const response = await fetch(`/api/v1/ingredients/${ingredientId}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setIngredientRecord(body.ingredient)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchIngredient()
  }, [])

  const deleteIngredient = async (ingredientPayload) => {
    try {
      const response = await fetch(`/api/v1/ingredients/${ingredientId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(ingredientPayload),
      })
      setShouldRedirect(true)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    deleteIngredient(ingredientRecord)
  }

  const returnToPantry = (event) => {
    event.preventDefault()
    setShouldRedirect(true)
  }

  if (shouldRedirect) {
    return <Redirect to="/pantry" />
  }

  return (
    <div>
      <h1>Remove from Pantry?</h1>
      <div className="button-group">
        <button className="alert button" onClick={onSubmitHandler}>
          Yes
        </button>
        <button className="button" onClick={returnToPantry}>
          No
        </button>
      </div>
    </div>
  )
}

export default IngredientDeleteForm
