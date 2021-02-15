import React, { useState, useEffect } from "react"
import RecipeTile from "../recipes/RecipeTile.js"
const UserProfilePage = (props) => {

  const [recipes, setRecipes] = useState([])

  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch(`/api/v1/recipes/userRecipes`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage);
        throw (error);
      }
      const responseBody = await response.json()
      const recipeData = responseBody.recipeData
      setRecipes(recipeData)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  }

  useEffect(() => {
    fetchSavedRecipes()
  }, [])

  const recipeDisplay = recipes.map((recipe, index) => {
    return <RecipeTile key={index} recipe={recipe} />
  })

  return <div>
    {recipeDisplay}
  </div>
}

export default UserProfilePage