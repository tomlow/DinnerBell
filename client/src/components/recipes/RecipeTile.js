import React from "react"
import { message } from "antd"
import { Link } from "react-router-dom"


const RecipeTile = ({ recipe, currentUser }) => {

  const recipeId = recipe.id
  const truncateRecipeSummary = (recipeSummary) => {
    if (recipeSummary.length > 100) {
      const truncatedRecipeSummary = recipe.summary.substr(0, 100) + "..."
      return truncatedRecipeSummary
    }
    else return recipeSummary
  }

  const signInPrompt = () => {
    message.info("Sign up to save recipes to your profile and edit ingredients!")
  }

  const saved = () => {
    message.success("Recipe saved!")
  }

  const warning = () => {
    message.warning("You've already saved that recipe!")
  }

  const truncateRecipeTitle = (recipeTitle) => {
    if (recipeTitle.length > 25) {
      const truncatedRecipeTitle = recipe.title.substr(0, 25) + "..."
      return truncatedRecipeTitle
    } else return recipeTitle
  }

  const saveRecipe = async (recipePayload) => {
    if (!currentUser) {
      return signInPrompt()
    }

    try {
      const response = await fetch('/api/v1/userRecipes', {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(recipePayload)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      saved()
    } catch (error) {
      warning()
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const onSaveHandler = () => {
    saveRecipe(recipe)
  }

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
          className="card__title">{truncateRecipeTitle(recipe.title)}
        </h3>
        <p
          dangerouslySetInnerHTML={{ __html: truncateRecipeSummary(recipe.summary) }}
        />
      </Link>
    </div>
    <div className="save-button-snackbar">
      <button
        className="card__btn" onClick={onSaveHandler}>
        Save Recipe
    </button>
    </div>
  </div>
}

export default RecipeTile