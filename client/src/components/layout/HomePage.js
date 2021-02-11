import React from "react"

const HomePage = (props) => {
  return <div>
    <div className="text-center headers">
      <h1>Welcome to DinnerBell</h1>
      <h2>What's on the menu?</h2>
    </div>
    <div className="text-center grid-x grid-padding-x align-spaced">
      <button className="sign-in button">Sign In</button> <button className="sign-up button">Sign Up</button>
    </div>
    <p>Big ol' image</p>
  </div>
}

export default HomePage