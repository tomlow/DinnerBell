import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  const unauthenticatedNavItems = [
    <li>
      DinnerBell
    </li>
  ]

  const authenticatedNavItems = [
    <li>
      <Link to="/" key="home-button">DinnerBell</Link>
    </li>,
    <li>
      <Link to="/profile" key="profile-button">Profile</Link>
    </li>,
    <li>
      <Link to="/pantry" key="pantry-button">Pantry</Link>
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
