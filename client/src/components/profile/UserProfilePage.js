import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { message, Modal } from "antd"
import _ from "lodash"

import SavedRecipeTile from "./SavedRecipeTile.js"

const UserProfilePage = (props) => {

  const [recipes, setRecipes] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const removed = () => {
    message.success("Recipe Removed")
  }

  let recipeDisplay
  let profileDisplay

  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch("/api/v1/userRecipes")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const responseBody = await response.json()
      const recipeData = responseBody.recipeData
      setRecipes(recipeData)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const removeRecipe = async (recipePayload) => {
    try {
      const response = await fetch("/api/v1/userRecipes", {
        method: "DELETE",
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
      const responseBody = await response.json()
      const remainingRecipes = responseBody.remainingRecipes
      removed()
      setRecipes(remainingRecipes)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchSavedRecipes()
    window.scrollTo(0, 0)
  }, [])


  if (_.isEmpty(recipes)) {
    profileDisplay = <div className="profile-container text-center">
      <h2>No recipes yet! Go check some out in the <Link to="/pantry">pantry</Link></h2>
    </div>
    return profileDisplay
  }

  if (!_.isEmpty(recipes)) {

    recipeDisplay = <div className="tile-container"> {recipes.map((recipe, index) => {
      return <SavedRecipeTile key={index} recipe={recipe} removeRecipe={removeRecipe} />
    })}</div>

    profileDisplay = <div className="profile-container text-center">
      <h1>Choose an old favorite</h1>
      <p className="modal-blurb">What's with the <strong className="modal-link" onClick={showModal}>colors?</strong></p>
      <Modal title="DinnerBell's Color Code" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>You may not always have all the ingredients for your favorite saved recipe, so DinnerBell greys those recipes out.</p>
        <p>Need to see what you're missing? Click on a greyed out recipe and see a list!</p>
      </Modal>
      {recipeDisplay}
    </div>
    return profileDisplay
  }
}

export default UserProfilePage