import React, { useState, useEffect } from "react"
import _ from "lodash"

import IngredientForm from "./IngredientForm"
const PantryList = (props) => {

  const [inventory, setInventory] = useState([])
  const [recipes, setRecipes] = useState([])

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/v1/ingredients')
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const responseBody = await response.json()
      const inventory = responseBody.userAmountsAndIngredients
      setInventory(inventory)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  //the most challenging, and possibly impossible, thing remains to manage how a user stores amount information for the ingredients in their pantry in any meaningful way the api can interact with. Because api currently stores amounts/measures as they relate to recipes. I'll show you. But not as they relate to inventory. Like, say you put in your cheddar in bricks, but a recipe calls for cups of cheese. How do you translate that so that the pantry and the recipe can interact smoothly? I think, by picking food, I've picked on of the most complex objects to interact with. I should have picked books. You're a book collector, and you can say, hey, search for this title. But I'm here, so how do I resolve this problem. Is there a way, or do I need to shift gears asap. 

  //In short, are these amounts stored in a way that a user is understanding them as they enter them, like cans and blocks and packages. Or is it in a way that a recipe understands them, like cups and ounces and individual units? And since it seems like both would be necessary, how do they speak to/translate for each other? That's kinda the big puzzle, isn't it. Okay, well, get it working with self-tailored insertion to make sure you can make the relations happen. Then practice making some API queries. Then see if you can crack a solution there. Might need some help, though. 

  useEffect(() => {
    fetchInventory()
  }, [])

  const inventoryList = inventory.map(amountAndIngredient => {
    return (<li key={amountAndIngredient.amountId}>
      {amountAndIngredient.quantity} {amountAndIngredient.unit} {amountAndIngredient.ingredientName}
    </li>
    )
  })

  const ingredientList = inventory.map(amountAndIngredient => {
    return amountAndIngredient.ingredientName
  }).join(", ")

  const onClickHandler = async (props) => {
    try {
      const response = await fetch(`/api/v1/recipes/?ingredientList=${ingredientList}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage);
        throw (error);
      }
      const responseBody = await response.json()
      const recipeData = responseBody.recipeData
      setRecipes(recipeData)
      console.log(recipeData)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }

    //this will make an API request with the ingredients, get back recipes, set them in state, and then you can manifest them in tiles below. Display 6, maybe? 

    //Dream feature: have a filter you could use to display only certain recipes. Like, check off dietary restrictions, etc.  
  }

  // let recipeDisplay = ""

  // if (!_.isEmpty(recipes)) {
  //   const recipeTiles = recipes.map(recipe => {
  //     return <RecipeTile recipe={recipe} />
  //   })
  //   recipeDisplay = <div>
  //     {recipeTiles}
  //   </div>
  // }

  const recipeButton = <div>
    <button className="button" onClick={onClickHandler}>What's for Dinner?</button>
  </div>

  return <div>
    <IngredientForm />
    <h1 className="text-center">
      You're Working With <br />
      -------------------
    </h1>
    <ul>
      {inventoryList}
    </ul>
    {recipeButton}
    {/* {recipeDisplay} */}
  </div>
}

export default PantryList