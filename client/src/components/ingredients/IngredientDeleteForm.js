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
