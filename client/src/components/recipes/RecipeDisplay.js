import React from "react"

import RecipeTile from "./RecipeTile.js"

const RecipeDisplay = ({ queryByIngredients, recipes }) => {

  let recipeDisplay;

  if (!_.isEmpty(recipes)) {
    recipeDisplay = <div className="tile-container">{recipes.map((recipe, index) => {
      return <RecipeTile key={index} recipe={recipe} />
    })}</div>
  }

  return <div className="recipe-display-container text-center">
    <div>
      <button className="button" onClick={queryByIngredients}>What's for Dinner?</button>
    </div>
    {recipeDisplay}
  </div>
}

export default RecipeDisplay