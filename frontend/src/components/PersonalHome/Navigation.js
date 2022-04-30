import React, { useState, useEffect } from "react";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";

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
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}Hello</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logoutEvent}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navigation;
