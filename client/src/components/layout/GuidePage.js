import React from "react"
import { Link } from "react-router-dom"
//accessed if no currentUser. Else straight to Pantry. Maybe antD? Maybe just ugh, idk, lose the background image here and have a pure guide color? Go from there. 

//Then it's pretty much good. 
const GuidePage = (props) => {
  return (
    <div className="navigation-container">
      <h2>New to DinnerBell?</h2>

      <p>Enter the contents of your pantry into our autocomplete bar</p>

      <p>Feel free to edit or delete any ingredients already present</p>

      <p>Search for recipes based on your current stock!</p>

      <p>Save and delete recipes from your user profile.</p>

      <p>Greyed-out recipes mean you're still missing some ingredients, but no worries: anything you still need will be on the recipe's instruction page!</p>

      <p>Ready to eat? <Link to="/user-session/new">Let's get cooking.</Link></p>

      <p>The Creator</p>
    </div>
  )
}

export default GuidePage