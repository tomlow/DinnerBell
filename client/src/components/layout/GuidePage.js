import React from "react"
import BioPage from "./BioPage.js"

const GuidePage = (props) => {
  return (
    <div className="bio-container">
      <h2>New to DinnerBell?</h2>

      <p>Hi! This is a kitchen tracking app that lets you enter your ingredients and search recipes you can make with them.</p>

      <p>I recommend you sign up for the best experience—that'll let you save recipes to your profile for later.</p>

      <p>If you're just looking to figure out tonight (as I was when I built this app), feel free to go ahead with the simple search here.</p>

      <p>The Creator</p>
      <BioPage />
    </div>
  )
}

export default GuidePage