import React from "react"
import RecipeTile from "./RecipeTile.js"

const RecipeDisplay = ({ queryByIngredients, recipes, currentUser }) => {
  let recipeDisplay

  if (!_.isEmpty(recipes)) {
    recipeDisplay = <div className="tile-container">{recipes.map((recipe, index) => {
      return <RecipeTile key={index} recipe={recipe} currentUser={currentUser} />
    })}</div>
  }

  return <div className={recipes.length > 0 ? "recipe-display-container text-center" : "recipe-button-container"} >
    <button className="button search-recipe-button" onClick={queryByIngredients}>What's for Dinner?</button>
    {recipeDisplay}
  </div >
}

export default RecipeDisplay