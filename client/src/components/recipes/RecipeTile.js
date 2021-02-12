import React from "react"
import { Link } from "react-router-dom"
const RecipeTile = ({ recipe }) => {
  return <Link to={`/recipes/${recipe.id}`}>
    <div className="card">
      <div className="card__body">
        <img src={recipe.image} alt="tasty beef stroganoff" className="card__image" />
        <div className="card__content-container">
          <h3 className="card__title">{recipe.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          <div className="card__button-container">
            <button className="card__btn">Save Recipe</button>
          </div>
        </div>
      </div>
    </div>
  </Link>
}

export default RecipeTile;