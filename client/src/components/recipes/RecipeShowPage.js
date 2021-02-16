import React from "react"

const RecipeShowPage = (props) => {

  const recipe = props.location.state.recipe
  const recipeSteps = recipe.instructions.map((instruction, index) => {
    return <li key={index}>{instruction.step}</li>
  })
  const recipeIngredients = recipe.extendedIngredients.map((ingredient, index) => {
    return <li key={index}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
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