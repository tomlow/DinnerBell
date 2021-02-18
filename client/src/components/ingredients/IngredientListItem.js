import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const IngredientListItem = ({ ingredient }) => {
  return <div className="ingredient-list-item">
    <div className="ingredient-right-column">
      <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt="an api-provided image for this ingredient" />
    </div>
    <div className="ingredient-left-column text-center">
      <p className="ingredient-name">{ingredient.name}</p>
      <div className="ingredient-icons">
        <Link to={`/ingredients/edit/${ingredient.id}`}>
          <FontAwesomeIcon icon={faEdit} className="ingredient-icon" />
        </Link>
        <Link to={`/ingredients/delete/${ingredient.id}`}>
          <FontAwesomeIcon icon={faTrashAlt} className="ingredient-icon" />
        </Link>
      </div>
    </div>
  </div>
}



export default IngredientListItem