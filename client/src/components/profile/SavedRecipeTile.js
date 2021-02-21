import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const SavedRecipeTile = ({ recipe, removeRecipe, handleClick }) => {

  const [gradientClass, setGradientClass] = useState("none")

  // if (recipe.missedIngredients.length > 0 && gradientClass === "none") {
  //   setGradientClass("partial")
  // }

  const recipeId = recipe.id
  const truncateRecipeSummary = (recipeSummary) => {
    if (recipeSummary.length > 100) {
      const truncatedRecipeSummary = recipe.summary.substr(0, 100) + "..."
      return truncatedRecipeSummary
    }
    else return recipeSummary
  }
  const truncateRecipeTitle = (recipeTitle) => {
    if (recipeTitle.length > 25) {
      const truncatedRecipeTitle = recipe.title.substr(0, 25) + "..."
      return truncatedRecipeTitle
    } else return recipeTitle
  }

  const onRemoveHandler = () => {
    removeRecipe(recipe)
  }

  return <div className={`card ${gradientClass}`}>
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
          className="card__title">{truncateRecipeTitle(recipe.title)}
        </h3>
        <p
          dangerouslySetInnerHTML={{ __html: truncateRecipeSummary(recipe.summary) }}
        />
      </Link>
    </div>
    <button
      className="card__btn" onClick={onRemoveHandler}>
      Remove Recipe
    </button>
  </div>
}

export default SavedRecipeTile;