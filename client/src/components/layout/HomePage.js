import React from "react"
import { Link } from "react-router-dom"

const HomePage = ({ currentUser }) => {

  const guideRoute = "/guide"
  const pantryRoute = "/pantry"
  return <div className="cell small-12 text-center">
    <div className="home-page">
      <div className="home-page-title">
        <h1>Welcome to DinnerBell</h1>
      </div>
      <div>
        <Link to={currentUser ? pantryRoute : guideRoute}><button className="button start-button"><h2>let's get cooking</h2></button></Link>
      </div>
    </div >
  </div >
}

export default HomePage