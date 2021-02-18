import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "../errorHandlers/ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const IngredientEditForm = (props) => {
  const [ingredientRecord, setIngredientRecord] = useState({
    name: "",
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { id: ingredientId } = props.match.params

  const fetchIngredient = async () => {
    try {
      const response = await fetch(`/api/v1/ingredients/${ingredientId}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      const ingredient = body.ingredient
      setIngredientRecord(ingredient)
    } catch (error) {
      console.error(error.message)
    }
  }

  const editIngredient = async (ingredientPayload) => {
    try {
      const response = await fetch(`/api/v1/ingredients/${ingredientId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(ingredientPayload),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        setErrors([])
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchIngredient()
  }, [])

  const handleInputChange = (event) => {
    setIngredientRecord({
      ...ingredientRecord,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const fieldReset = () => {
    setIngredientRecord({
      name: "",
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    editIngredient(ingredientRecord)
    fieldReset()
  }

  const clearForm = (event) => {
    event.preventDefault()
    fieldReset()
  }

  if (shouldRedirect) {
    return <Redirect to="/pantry" />
  }

  return (
    <div>
      <h1>Edit Ingredient</h1>
      <ErrorList errors={errors} />
      <form className="callout" onSubmit={onSubmitHandler}>
        <label htmlFor="name">
          Ingredient:
        </label>
        <input type="text"
          id="name"
          name="name"
          onChange={handleInputChange}
          value={ingredientRecord.name}
        />
        <div className="button-group">
          <button className="button" onClick={clearForm}>
            Clear
          </button>
          <input className="success button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default IngredientEditForm
