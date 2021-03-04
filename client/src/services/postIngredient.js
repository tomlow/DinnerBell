import fetchInventory from "./fetchInventory.js"
import { message } from "antd"

const warning = () => {
  message.warning('You already have this ingredient!');
};

const emptyWarning = () => {
  message.warning('Enter an ingredient first!')
};

const inventory = fetchInventory()

const ingredientNames = inventory.map(item => item.name)

const postIngredient = async (formPayload) => {
  if (ingredientNames.includes(formPayload.name)) {
    return warning()
  }

  if (formPayload.name === "") {
    return emptyWarning()
  }

  try {
    const response = await fetch('/api/v1/ingredients', {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(formPayload)
    })
    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json()
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    } else {
      const responseBody = await response.json()
      const newIngredient = responseBody.newIngredient
      return [...inventory, newIngredient]
    }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}

export default postIngredient