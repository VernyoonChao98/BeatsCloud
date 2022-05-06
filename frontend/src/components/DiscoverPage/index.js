import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

import Navigation from "../Navigation";
import { createSongPlaylistAssociation } from "../../store/playlists";
import "./DiscoverPage.css";

function DiscoverPage({ audioFunction }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.audioFile);
  const myPlaylists = useSelector((state) => state.playlist);
  const [selectedPlaylist, setSelectedPlaylist] = useState();

  if (!sessionUser) return <Redirect to="/" />;

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
    <div id="noTopBorder" className="wholeContent">
      <Navigation user={sessionUser} />
      <div className="allSongs">
        {Object.values(songs).map((singleSong) => {
          return (
            <div className="songCards" key={singleSong.id}>
              <div className="songOwnerName">{singleSong.User.username}</div>
              <NavLink
                className="songCardsSongName"
                to={`/songs/${singleSong.id}`}
              >
                <p>{singleSong.title}</p>
              </NavLink>
              <form className="addToPlaylistForm">
                <button
                  className="button"
                  id="addToPlaylistButton"
                  onClick={async (e) =>
                    await handleAddToPlaylist(e, singleSong)
                  }
                >
                  Add to Playlist
                </button>
                <select
                  className="selects"
                  onChange={(e) => {
                    setSelectedPlaylist(e.target.value);
                  }}
                >
                  <option className="options" value={"null"}>
                    Select Playlist
                  </option>
                  {Object.values(myPlaylists)
                    .filter(
                      (myPlaylist) => myPlaylist.userId === sessionUser.id
                    )
                    .map((myPlaylist) => {
                      return (
                        <option
                          className="options"
                          key={myPlaylist.id}
                          value={myPlaylist.id}
                        >
                          {myPlaylist.title}
                        </option>
                      );
                    })}
                </select>
              </form>
              <button
                className="playSong"
                key={singleSong.id}
                onClick={(e) => {
                  audioFunction(singleSong);
                }}
              >
                Play
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DiscoverPage;
