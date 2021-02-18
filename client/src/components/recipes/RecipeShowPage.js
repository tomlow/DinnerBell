import React from "react"

const RecipeShowPage = (props) => {

  const recipe = props.location.state.recipe
  debugger
  const recipeSteps = recipe.instructions.map((instruction, index) => {
    debugger
    return <li key={index}>{instruction.step}</li>
  })
  const recipeIngredients = recipe.extendedIngredients.map((ingredient, index) => {
    return <li key={index}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
  })

  return <div className="show-container text-center">
    <h1>{recipe.title}</h1>
    <div>Ready in {recipe.readyInMinutes} Minutes Servings: {recipe.servings}</div>
    <img src={recipe.image} alt="recipe image" className="show-image" />
    <ul>{recipeIngredients}</ul>
    <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
    <ol className="text-left">{recipeSteps}</ol>
  </div>
}

export default RecipeShowPage