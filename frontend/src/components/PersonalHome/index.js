import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../store/session";
import { Route, Switch } from "react-router-dom";
import { restoreUser } from "../../store/session";

import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignUpFormPage";
import Navigation from "..//Navigation";

function PersonalHome() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      <h2>PersonalHome</h2>
    </div>
  );
}

export default PersonalHome;
