import React from "react"
import { Link } from "react-router-dom"
const HomePage = ({ user }) => {


  const signUpRoute = "/users/new"
  const pantryRoute = "/pantry"
  return <div className="cell small-12 text-center">
    <div className="home-page">
      <div className="home-page-title">
        <h1>Welcome to DinnerBell</h1>
      </div>
      <div>
        <Link to={user ? pantryRoute : signUpRoute}><button className="button start-button"><h2>let's get cooking</h2></button></Link>
      </div>
    </div >
  </div >
}

export default HomePage