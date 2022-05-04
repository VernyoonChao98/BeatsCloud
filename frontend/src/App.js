import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { restoreUser } from "./store/session";
import { loadAllSongs } from "./store/audioFile";
import { loadAllPlaylist } from "./store/playlists";

import Home from "./components/HomePage";
import PersonalHome from "./components/MyHome";
import UploadPage from "./components/UploadPage";
import EditSongPage from "./components/EditSongPage";
import DiscoverPage from "./components/DiscoverPage";
import PlaylistsPage from "./components/PlaylistsPage";
import CreatePlaylistPage from "./components/PlaylistsPage/CreatePlaylistsPage";
import EditPlaylistPage from "./components/EditPlaylistPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
    dispatch(loadAllSongs());
    dispatch(loadAllPlaylist());
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/discover">
            <DiscoverPage />
          </Route>
          <Route path="/myHome">
            <PersonalHome />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/songs/:id">
            <EditSongPage />
          </Route>
          <Route path="/playlists" exact>
            <PlaylistsPage />
          </Route>
          <Route path="/playlists/create">
            <CreatePlaylistPage />
          </Route>
          <Route path="/playlists/:id">
            <EditPlaylistPage />
          </Route>
        </Switch>
      </>
    )
  );
}

export default App;
