import React, { useState, useEffect } from "react"

import IngredientListItem from "./IngredientListItem.js"

import IngredientForm from "./IngredientForm"
const IngredientsList = ({ inventory }) => {

  const inventoryList = inventory.map((ingredient, index) => {
    return <IngredientListItem ingredient={ingredient} index={index} />
  })

  return <div>
    <IngredientForm />
    <ul>
      {inventoryList}
    </ul>
  </div>
}

export default IngredientsList