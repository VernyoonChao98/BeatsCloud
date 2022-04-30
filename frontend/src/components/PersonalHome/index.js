import React from "react";
import { useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import "./PersonalHome.css";

function PersonalHome() {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div>
      <h2>PersonalHome</h2>
      <NavLink exact to="/">
        Home
      </NavLink>
      <Navigation user={sessionUser} />
    </div>
  );
}

export default PersonalHome;
