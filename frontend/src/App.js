import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { restoreUser } from "./store/session";

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation";
import Home from "./components/HomePage";
import PersonalHome from "./components/PersonalHome";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
