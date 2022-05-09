import React, { useState, useEffect } from "react";
import { logout } from "../store/session";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

function Navigation({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logoutEvent = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="navigation">
      <NavLink exact to="/discover">
        <p className="navigationText" id="logo"></p>
      </NavLink>
      <NavLink
        className="navigationLink"
        exact
        style={{ textDecoration: "none", color: "white" }}
        activeStyle={{ backgroundColor: "#111" }}
        to="/myHome"
      >
        MySongs
      </NavLink>
      <NavLink
        className="navigationLink"
        exact
        style={{ textDecoration: "none", color: "white" }}
        activeStyle={{ backgroundColor: "#111" }}
        to="/playlists"
      >
        Playlist
      </NavLink>
      <NavLink
        className="navigationLink"
        exact
        style={{ textDecoration: "none", color: "white" }}
        activeStyle={{ backgroundColor: "#111" }}
        to="/upload"
      >
        Upload
      </NavLink>
      <button className="username" onClick={openMenu}>
        <i className="fas fa-user-circle" />
        <div>{user.username}</div>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <button className="button" onClick={logoutEvent}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Navigation;
