import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { restoreUser } from "../../store/session";
import Navigation from "./Navigation";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./PersonalHome.css";

function PersonalHome() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

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
