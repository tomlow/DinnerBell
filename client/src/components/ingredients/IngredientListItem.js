import React from "react"
import { Link } from "react-router-dom"

const IngredientListItem = ({ ingredient, index }) => {
  return <li key={index}>{ingredient.name}
    <Link className="button" to={`/ingredients/edit/${ingredient.id}`}>
      Edit
        </Link>
    <Link className="button" to={`/ingredients/delete/${ingredient.id}`}>
      Remove
        </Link>
  </li>
}



export default IngredientListItem