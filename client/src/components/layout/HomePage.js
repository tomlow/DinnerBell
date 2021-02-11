import React from "react"

const HomePage = (props) => {
  return <div className="app-container">
    <div className="text-center headers">
      <h1>Welcome to DinnerBell</h1>
      <h2>What's on the menu?</h2>
    </div>
    <div className="text-center">
      <button className="sign-in button">Sign In</button> or <button className="sign-up button">Sign Up</button>
      <p>Big ol' image</p>
    </div>
  </div>
}

export default HomePage