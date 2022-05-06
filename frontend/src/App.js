import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { restoreUser } from "./store/session";
import { loadAllSongs } from "./store/audioFile";
import { loadAllPlaylist } from "./store/playlists";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

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

  const [song, setSong] = useState("");
  const player = useRef();

  useEffect(async () => {
    await dispatch(loadAllSongs());
    await dispatch(loadAllPlaylist());
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const audioFunction = async (singleSong) => {
    await setSong(`${singleSong.songUrl}`);
    player.current.audio.current.play(song);
  };

  return (
    isLoaded && (
      <>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/discover">
            <DiscoverPage audioFunction={audioFunction} />
          </Route>
          <Route path="/myHome">
            <PersonalHome audioFunction={audioFunction} />
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
        <footer id="footer">
          <AudioPlayer
            id="musicPlayer"
            src={`${song}`}
            onPlay={(e) => console.log("Playing")}
            ref={player}
            volume={0.1}
            layout="horizontal-reverse"
          />
        </footer>
      </>
    )
  );
}

export default App;
