import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import _ from "lodash"

import SavedRecipeTile from "./SavedRecipeTile.js"

const UserProfilePage = (props) => {

  const [recipes, setRecipes] = useState([])
  const [defaultDisplay, setDefaultDisplay] = useState(true)

  let recipeDisplay;
  let profileDisplay;

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
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  }

  useEffect(() => {
    fetchSavedRecipes()
  }, [])


  if (!_.isEmpty(recipes) && defaultDisplay === true) {
    setDefaultDisplay(false)
  }

  if (defaultDisplay) {
    profileDisplay = <div className="profile-container text-center">
      <h2>No recipes yet! Go check some out in the <Link to="/pantry">pantry</Link></h2>
    </div>
    return profileDisplay
  }

  if (!defaultDisplay) {
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