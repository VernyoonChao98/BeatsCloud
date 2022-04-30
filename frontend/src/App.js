import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { restoreUser } from "./store/session";

import Home from "./components/HomePage";
import PersonalHome from "./components/PersonalHome";
import SignupFormPage from "./components/SignUpFormPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/myHome">
          <PersonalHome />
        </Route>
        <Route path="/createAccount">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
