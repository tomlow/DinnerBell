import React from "react"

const RecipeShowPage = (props) => {

  const recipe = props.location.state.recipe
  const recipeSteps = recipe.analyzedInstructions[0].steps.map((step, index) => {
    return <li key={index}>{step.step}</li>
  })
  const recipeIngredients = recipe.extendedIngredients.map((ingredient, index) => {
    return <li key={index}>{ingredient.measures.us.amount} {ingredient.measures.us.unitLong} {ingredient.name}</li>
  })

  return <div>
    <h1>{recipe.title}</h1>
    <div>Ready in {recipe.readyInMinutes} Minutes Servings: {recipe.servings}</div>
    <img src={recipe.image} alt="recipe image" />
    <ul>{recipeIngredients}</ul>
    <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
    <ol>{recipeSteps}</ol>
  </div>
}

export default RecipeShowPage