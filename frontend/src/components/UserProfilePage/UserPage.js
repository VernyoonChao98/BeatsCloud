import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect, NavLink } from "react-router-dom";

import Navigation from "../Navigation";

function UserPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div id="noTopBorder" className="wholeContent">
      <Navigation user={sessionUser} />
      <div>Top Part</div>
      <div>Main Content</div>
    </div>
  );
}

export default UserPage;
