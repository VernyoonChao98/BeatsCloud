import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { restoreUser } from "./store/session";
import { loadAllSongs } from "./store/uploadFile";

import Home from "./components/HomePage";
import PersonalHome from "./components/PersonalHome";
import UploadPage from "./components/UploadPage";
import EditPage from "./components/EditPage";

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
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/songs/:id">
            <EditPage />
          </Route>
        </Switch>
      </>
    )
  );
}

export default App;
