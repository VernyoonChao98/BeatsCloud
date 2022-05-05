import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import Navigation from "../Navigation";
import { createSongPlaylistAssociation } from "../../store/playlists";

function DiscoverPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.audioFile);
  const myPlaylists = useSelector((state) => state.playlist);
  const [selectedPlaylist, setSelectedPlaylist] = useState();

  const [song, setSong] = useState("");
  const player = useRef();

  if (!sessionUser) return <Redirect to="/" />;

  const audiofunction = async (singleSong) => {
    await setSong(`${singleSong.songUrl}`);
    player.current.audio.current.play(song);
  };

  const handleAddToPlaylist = (e, singleSong) => {
    e.preventDefault();
    const payload = {
      playlistId: parseInt(selectedPlaylist),
      song: singleSong,
    };
    if (selectedPlaylist) {
      dispatch(createSongPlaylistAssociation(payload));
    }
    if (!selectedPlaylist) {
      console.log("this is not a valid playlist");
    }
    setSelectedPlaylist();
  };

  return (
    <div id="topBorder" className="wholeContent">
      <Navigation user={sessionUser} />
      <div className="allSongs">
        {Object.values(songs).map((singleSong) => {
          return (
            <div key={singleSong.id}>
              <NavLink to={`/songs/${singleSong.id}`}>
                {singleSong.title}
              </NavLink>
              <button
                key={singleSong.id}
                onClick={(e) => {
                  audiofunction(singleSong);
                }}
              >
                Play Song
              </button>
              <form>
                <select
                  className="selects"
                  onChange={(e) => {
                    setSelectedPlaylist(e.target.value);
                  }}
                >
                  <option value={"null"}>Select a Playlist</option>
                  {Object.values(myPlaylists)
                    .filter(
                      (myPlaylist) => myPlaylist.userId === sessionUser.id
                    )
                    .map((myPlaylist) => {
                      return (
                        <option key={myPlaylist.id} value={myPlaylist.id}>
                          {myPlaylist.title}
                        </option>
                      );
                    })}
                </select>
                <button onClick={(e) => handleAddToPlaylist(e, singleSong)}>
                  Add to Playlist
                </button>
              </form>
            </div>
          );
        })}
      </div>
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
    </div>
  );
}

export default DiscoverPage;
