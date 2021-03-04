const fetchInventory = async () => {
  try {
    const response = await fetch('/api/v1/ingredients')
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`)
    }
    const responseBody = await response.json()
    const inventory = responseBody.ingredients
    return inventory
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}

export default fetchInventory