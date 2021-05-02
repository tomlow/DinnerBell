import React from "react"

const RecipeShowPage = (props) => {
  const recipe = props.location.state.recipe
  const recipeSteps = recipe.instructions.map((instruction, index) => {
    return <li key={index}>{instruction.step}</li>
  })
  const recipeIngredients = recipe.extendedIngredients.map((ingredient, index) => {
    return <li key={index}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
  })

  const missedIngredients = recipe.missedIngredients.map(missedIngredient => {
    return <li>{missedIngredient.name}<img src={`${missedIngredient.image}`} alt="missing ingredient" /></li>
  })

  return <div>
    <div className="show-container text-center">
      <div className="show-title">
        <h1>{recipe.title}</h1>
        <div className="ready-serving-info">
          <div className="ready-in">Ready in: {recipe.readyInMinutes} Minutes</div> <div className="serves">Serves {recipe.servings}</div>
        </div>
      </div>
      <div className="show-columns">
        <div className="show-page-left-column">
          <img src={recipe.image} alt="recipe image" className="show-image" />
        </div>
        <div className="show-page-right-column text-center">
          <div>
            <h3>Ingredients</h3>
            <ul className="show-ingredients">{recipeIngredients}</ul>
          </div>
          <div className="missed-ingredients-container">
            <h3>You're Missing</h3>
            <ul className="show-ingredients missed-ingredients">{missedIngredients}</ul>
          </div>
        </div>
      </div>
      <div className="show-summary">
        <h3>Summary</h3>
        <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
      </div>
      <div className="show-instructions text-center">
        <h3>Instructions</h3>
        <ol className="text-center">{recipeSteps}</ol>
      </div>
    </div>
  </div >
}

export default RecipeShowPage