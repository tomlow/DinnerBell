import React, { useState } from "react"

const IngredientForm = (props) => {

  const [ingredientRecord, setIngredientRecord] = useState({
    name: ""
  })

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

  const handleInputChange = (event) => {
    setIngredientRecord({
      ...ingredientRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    postIngredient(ingredientRecord)
    setIngredientRecord({ name: "" })
  }

  return <div>
    <form onSubmit={onSubmitHandler}>
      <label>Ingredient Name:
        <input type="text" id="name" name="name" value={ingredientRecord.name} onChange={handleInputChange} />
      </label>
      <input className="button" type="submit" value="Put it in the Pantry" onSubmit={onSubmitHandler} />
    </form>
  </div>
}

export default IngredientForm