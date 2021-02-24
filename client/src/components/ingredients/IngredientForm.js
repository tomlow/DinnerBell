import React, { useState } from "react"
import AsyncSelect from 'react-select/async';

const IngredientForm = ({ postIngredient }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState({
    name: "",
    image: ""
  });

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
    postIngredient(selectedValue)
    setSelectedValue({
      name: "",
      image: ""
    })
  }

  return <div>
    <form onSubmit={onSubmitHandler}>
      <label className="ingredient-form-label">What are you working with?</label >
      <div className="autocomplete container">
        <AsyncSelect
          value={selectedValue}
          getOptionLabel={e => e.name}
          getOptionValue={e => e.name}
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          onChange={handleChange}
          classNamePrefix="ingredient-input"
          style={{
            height: 500,
            borderRadius: 6
          }}
        />
      </div>
      <input className="button" type="submit" value="Put it in the Pantry" onSubmit={onSubmitHandler} />
    </form >
  </div >
}

export default IngredientForm