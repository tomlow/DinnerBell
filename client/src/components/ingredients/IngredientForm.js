import React, { useState } from "react"
import AsyncSelect from 'react-select/async';

const IngredientForm = (props) => {
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
      setSelectedValue({ name: "", image: "" })
      setErrors([])
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    postIngredient(selectedValue)
  }

  return <div>
    <form onSubmit={onSubmitHandler}>
      <label>Ingredient Name:
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
      </label >
      <input className="button" type="submit" value="Put it in the Pantry" onSubmit={onSubmitHandler} />
    </form >
  </div >
}

export default IngredientForm