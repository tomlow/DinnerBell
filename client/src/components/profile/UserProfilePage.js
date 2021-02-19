import React, { useState, useEffect } from "react"
import SavedRecipeTile from "./SavedRecipeTile.js"
import _ from "lodash"

const UserProfilePage = (props) => {

  const [recipes, setRecipes] = useState([])
  let recipeDisplay;
  let profileDisplay = <div></div>;

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
      setRecipes(recipeData)
      profileDisplay = <div className="profile-container text-center">
        <h2>No recipes saved yet! Explore your pantry and add some!</h2>
        {recipeDisplay}
      </div>;
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  }

  useEffect(() => {
    fetchSavedRecipes()
  }, [])

  if (_.isEmpty(recipes)) {
    return profileDisplay
  }

  if (!_.isEmpty(recipes)) {
    recipeDisplay = <div className="tile-container"> {recipes.map((recipe, index) => {
      return <SavedRecipeTile key={index} recipe={recipe} />
    })}</div>
    profileDisplay = <div className="profile-container text-center">
      <h1>Choose an old favorite</h1>
      {recipeDisplay}
    </div>
    return profileDisplay
  }
}
export default UserProfilePage