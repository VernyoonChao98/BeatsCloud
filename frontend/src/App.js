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

import "./index.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const [song, setSong] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSongName, setCurrentSongName] = useState(
    "No Songs Currently Playing"
  );
  const [currentPlaylistSongNames, setCurrentPlaylistSongNames] = useState([]);
  const player = useRef();

  useEffect(() => {
    dispatch(loadAllSongs());
    dispatch(loadAllPlaylist());
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const audioFunction = async (singleSong) => {
    setCurrentSongName(singleSong.title);
    await setSong(`${singleSong.songUrl}`);
    setPlaylist([]);
    player.current.audio.current.play(song);
  };

  const audioFunctionPlaylist = (singlePlaylist) => {
    if (singlePlaylist.Songs.length === 0) {
      setCurrentSongName("No songs in Playlist");
      return;
    }
    const playlistSongNames = singlePlaylist.Songs.map(
      (SongObj) => SongObj.title
    );
    const playlistSongs = singlePlaylist.Songs.map(
      (SongObj) => SongObj.songUrl
    );

    setCurrentPlaylistSongNames(playlistSongNames);
    setPlaylist(playlistSongs);

    setCurrentSongName(playlistSongNames[0]);
    setSong(playlistSongs[0]);

    setSong(playlistSongs[0]);
    setCurrentIndex(0);
  };

  const handleClickPrev = (e) => {
    if (playlist.length === 0) {
      return;
    }
    const changeValue = currentIndex - 1;
    setCurrentIndex(changeValue);
    if (!playlist[changeValue]) {
      setCurrentIndex(playlist.length - 1);
      setCurrentSongName(
        currentPlaylistSongNames[currentPlaylistSongNames.length - 1]
      );
      setSong(playlist[playlist.length - 1]);
    } else {
      setCurrentSongName(currentPlaylistSongNames[changeValue]);
      setSong(playlist[changeValue]);
    }
    return;
  };

  const handleClickNext = (e) => {
    if (playlist.length === 0) {
      return;
    }
    const changeValue = currentIndex + 1;
    setCurrentIndex(changeValue);
    if (!playlist[changeValue]) {
      setCurrentIndex(0);
      setCurrentSongName(currentPlaylistSongNames[0]);
      setSong(playlist[0]);
    } else {
      setCurrentSongName(currentPlaylistSongNames[changeValue]);
      setSong(playlist[changeValue]);
    }
    return;
  };

  return (
    isLoaded && (
      <>
        <Switch>
          <Route path="/" exact>
            <Home audioFunction={audioFunction} />
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
            <PlaylistsPage audioFunctionPlaylist={audioFunctionPlaylist} />
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
            showSkipControls={true}
            showJumpControls={false}
            onClickPrevious={(e) => handleClickPrev()}
            onClickNext={(e) => handleClickNext()}
            onEnded={() => handleClickNext()}
            autoPlayAfterSrcChange={true}
            header={`Playing: ${currentSongName}`}
            customAdditionalControls={[]}
          />
        </footer>
      </>
    )
  );
}

export default App;
