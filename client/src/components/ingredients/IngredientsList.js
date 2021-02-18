import React, { useState, useEffect } from "react"

import IngredientListItem from "./IngredientListItem.js"

import IngredientForm from "./IngredientForm"

const IngredientsList = ({ inventory }) => {

  const inventoryList = inventory.map((ingredient, index) => {
    return <IngredientListItem ingredient={ingredient} index={index} />
  })

  return <div>
    <div className="ingredient-form-container">
      <h1>Welcome to your pantry: The Source of Creativity! (and currently the world's ugliest list)</h1>
      <IngredientForm />
    </div>
    <div className="ingredient-list-container grid-x">
      <div className="ingredient-list large-12 cell">
        {inventoryList}
      </div>
    </div>
  </div>
}

export default IngredientsList