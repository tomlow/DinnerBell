import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import AsyncSelect from 'react-select/async';

const IngredientForm = (props) => {

  // const SelectAsync = () => {
  //   const [inputValue, setInputValue] = useState('');
  //   const [selectedValue, setSelectedValue] = useState(null);
  //   const handleInputChange = value => {
  //     setInputValue(value)
  //   };
  //   const handleChange = value => {
  //     setSelectedValue(value)
  //   }
  //   const loadOptions = (inputValue) => {
  //     return fetch(`/api/v1/ingredients/?query=${inputValue}`).then(res => res.json())
  //   };
  //   return (
  //     <div>
  //       <AsyncSelect
  //         value={selectedValue}
  //         getOptionLabel={e => e.name}
  //         getOptionValue={e => e.id}
  //         loadOptions={loadOptions}
  //         onInputChange={handleInputChange}
  //         onChange={handleChange}
  //       />
  //       <pre>Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</pre> (this just shows your returned data for testing)
  //     </div>
  //   );
  // }
  // export default SelectAsync;

  const [ingredientRecord, setIngredientRecord] = useState({
    name: ""
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)
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
      setIngredientRecord({ name: "" })
      setErrors([])
      setShouldRedirect(true)
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
  }

  if (shouldRedirect) {
    return <Redirect to="/pantry" />
  }

  return <div>
    <form onSubmit={onSubmitHandler}>
      <label>Ingredient Name:
        <input type="text" id="name" name="name" value={ingredientRecord.name} onChange={handleInputChange} />
      </label >
      <input className="button" type="submit" value="Put it in the Pantry" onSubmit={onSubmitHandler} />
    </form >
  </div >
}

export default IngredientForm