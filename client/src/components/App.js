import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

// import "foundation-sites"

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute.js"
import Pantry from "./Pantry.js"
import IngredientEditForm from "./ingredients/IngredientEditForm.js"
import RecipeShowPage from "./recipes/RecipeShowPage.js"
import UserProfilePage from "./profile/UserProfilePage.js"
import HomePage from "./layout/HomePage.js"

const App = (props) => {

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);
  return (
    <Router>
      <TopBar user={currentUser} />
      <div className="grid-container">
        <Switch>
          <Route exact path="/">
            <HomePage user={currentUser} />
          </Route>
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
          <Pantry exact path="/pantry" currentUser={currentUser} />
          <Route exact path="/ingredients/edit/:id" component={IngredientEditForm} />
          <Route exact path="/recipes/:id" component={RecipeShowPage} />
          <Route exact path="/profile" component={UserProfilePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default hot(App);
