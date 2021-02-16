import React from "react"
import { Link } from "react-router-dom"
const HomePage = ({ user }) => {

  const signUpRoute = "/users/new"
  const pantryRoute = "/pantry"
  return <div>
    <div className="text-center headers">
      <h1>Welcome to DinnerBell</h1>
      <Link to={user ? pantryRoute : signUpRoute}><h2>let's get cooking</h2></Link>
    </div>
  </div>
}

export default HomePage