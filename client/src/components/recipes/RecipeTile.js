import React, { useState } from "react"
import { Link } from "react-router-dom"

const RecipeTile = ({ recipe }) => {
  const recipeId = recipe.id

  return <div className="card">

    <div className="card__body">
      <Link
        id="recipe-show-link" to={{
          pathname:
            `/recipes/${recipeId}`,
          state: { recipe: recipe }
        }}
      >
        <img
          src={recipe.image} alt="tasty recipe image" className="card__image"
        />
        <h3
          className="card__title">{recipe.title}
        </h3>
        <p
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />
      </Link>
      <div className="card__button-container">
        <button
          className="card__btn" onClick={() => { alert("Recipe saved!") }}>
          Save Recipe
          </button>
      </div>
    </div>
  </div >
}

export default RecipeTile;