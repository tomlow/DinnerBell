import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import translateServerErrors from "../../services/translateServerErrors.js"
import AsyncSelect from 'react-select/async';

const IngredientEditForm = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const { id: ingredientId } = props.match.params
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState({
    name: "",
    image: ""
  });
  const [errors, setErrors] = useState([])

  const handleInputChange = value => {
    setInputValue(value)
  };

  const handleChange = value => {
    setSelectedValue(value)
  }
  const loadOptions = (inputValue) => {
    return fetch(`/api/v1/ingredients/autocomplete?query=${inputValue}`).then(res => res.json())
  };

  const onSubmitHandler = (event) => {
    event.preventDefault()
    editIngredient(selectedValue)
    setSelectedValue({
      name: "",
      image: ""
    })
  }

  const fetchIngredient = async () => {
    try {
      const response = await fetch(`/api/v1/ingredients/${ingredientId}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      const ingredient = body.ingredient
      setSelectedValue(ingredient)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchIngredient()
  }, [])

  const editIngredient = async (ingredientPayload) => {
    try {
      const response = await fetch(`/api/v1/ingredients/`, {
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
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  if (shouldRedirect) {
    return <Redirect to="/pantry" />
  }

  return (
    <div className="edit-form-container text-center">
      <form onSubmit={onSubmitHandler}>
        <label className="ingredient-form-label">Try entering your ingredient again</label >
        <div>
          <AsyncSelect
            value={selectedValue}
            getOptionLabel={e => e.name}
            getOptionValue={e => e.name}
            loadOptions={loadOptions}
            onInputChange={handleInputChange}
            onChange={handleChange}
          />
        </div>
        <input className="button" type="submit" value="Restock the Shelf" onSubmit={onSubmitHandler} />
      </form >
    </div >
  )
}

export default IngredientEditForm
