import React from "react"
import { Link } from "react-router-dom"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const IngredientListItem = ({ ingredient, index }) => {
  return <div className="ingredient-list-item">
    <div className="ingredient-left-column">
      <p key={index}>{ingredient.name}</p>
      <div className="ingredient-icons">
        <Link to={`/ingredients/edit/${ingredient.id}`}>
          {/* <FontAwesomeIcon icon={"faEdit"} /> */}
        </Link>
        <Link to={`/ingredients/delete/${ingredient.id}`}>
          {/* <FontAwesomeIcon icon={"faTrashAlt"} /> */}
        </Link>
      </div>
    </div>
    <div className="ingredient-right-column">
      <img src={`https://spoonacular.com/cdn/ingredients_100x100/apple.jpg`} alt="an api-provided image for this ingredient" />
    </div>
  </div>
}



export default IngredientListItem