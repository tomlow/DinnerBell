import React, { useState, useEffect } from "react"
import SavedRecipeTile from "./SavedRecipeTile.js"
const UserProfilePage = (props) => {

  const [recipes, setRecipes] = useState([])

  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch("/api/v1/userRecipes")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage);
        throw (error);
      }
      const responseBody = await response.json()
      const recipeData = responseBody.recipeData
      debugger
      setRecipes(recipeData)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  }

  useEffect(() => {
    fetchSavedRecipes()
  }, [])

  let recipeDisplay;

  if (!_.isEmpty(recipes)) {
    recipeDisplay = <div className="tile-container"> {recipes.map((recipe, index) => {
      return <SavedRecipeTile key={index} recipe={recipe} />
    })}</div>
  }

  return <div className="profile-container text-center">
    <h1>Choose an old favorite</h1>
    {recipeDisplay}
  </div>
}

export default UserProfilePage