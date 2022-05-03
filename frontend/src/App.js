import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { restoreUser } from "./store/session";
import { loadAllSongs } from "./store/uploadFile";

import Home from "./components/HomePage";
import PersonalHome from "./components/PersonalHome";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
    dispatch(loadAllSongs());
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/myHome">
            <PersonalHome />
          </Route>
        </Switch>
      </>
    )
  );
}

export default App;
