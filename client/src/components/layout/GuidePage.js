import React from "react"
import { Link } from "react-router-dom"
import BioPage from "./BioPage.js"

const GuidePage = (props) => {
  return (
    <div className="guide-container">
      <h2>New to DinnerBell?</h2>
      <div className="guide-points">
        <p>Hi! This is a kitchen tracking app that lets you enter ingredients in your pantry and search recipes you can make with them. You can even click on the recipes to see instructions and missing ingredients!</p>

        <p>I recommend you <Link to="/users/new">sign up</Link> for the best experience—that'll let you save recipes to your profile for later.</p>

        <p>If you're just looking to get something on the table tonight (as I was when I built this app), feel free to go ahead with the simple search <Link to="/pantry">here</Link>.</p>
      </div>

      <h2>Meet the Creator</h2>
      <BioPage />
    </div >
  )
}

export default GuidePage