import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in" className="sign-in-button">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up" className="sign-up-button-container">
      <Link to="/users/new" className="button sign-up-button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out" className="sign-out-button-container">
      <SignOutButton />
    </li>,
  ];

  const unauthenticatedNavItems = [
    <li>
      <Link to="/" key="home-button" className="home-button">DinnerBell</Link>
    </li>
  ]

  const authenticatedNavItems = [
    <li>
      <Link to="/" key="home-button" className="home-button">DinnerBell</Link>
    </li>,
    <li>
      <Link to="/profile" key="profile-button" className="profile-button">Profile</Link>
    </li>,
    <li>
      <Link to="/pantry" key="pantry-button" className="pantry-button">Pantry</Link>
    </li>
  ]

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          {user ? authenticatedNavItems : unauthenticatedNavItems}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
