import React, { useState } from "react"

const IngredientForm = (props) => {

  const [ingredientRecord, setIngredientRecord] = useState({
    name: ""
  })

  const handleInputChange = (event) => {
    setIngredientRecord({
      ...ingredientRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return <div>
    <form>
      <label>Ingredient Name:
        <input type="text" id="name" name="name" value={ingredientRecord.name} onChange={handleInputChange} />
      </label>
      <input className="button" type="submit" value="Put it in the Pantry" />
    </form>
  </div>
}

export default IngredientForm