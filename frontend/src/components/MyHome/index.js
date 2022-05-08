import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

import { deleteOldSong } from "../../store/audioFile";
import { createSongPlaylistAssociation } from "../../store/playlists";

import Navigation from "../Navigation";

function MyHome({ audioFunction }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.audioFile);
  const myPlaylists = useSelector((state) => state.playlist);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  if (!sessionUser) return <Redirect to="/" />;

  const handleDelete = (singleSong) => {
    dispatch(deleteOldSong(singleSong));
  };

  const handleAddToPlaylist = (e, singleSong) => {
    e.preventDefault();
    const payload = {
      playlistId: parseInt(selectedPlaylist),
      song: singleSong,
    };
    if (
      !selectedPlaylist ||
      selectedPlaylist === null ||
      selectedPlaylist === "" ||
      selectedPlaylist === "null"
    ) {
      console.log("this is not a valid playlist");
    } else {
      dispatch(createSongPlaylistAssociation(payload));
    }
    setSelectedPlaylist("");
  };

  return (
    <div id="noTopBorder" className="wholeContent">
      <Navigation user={sessionUser} />
      <div className="allSongsMyPage">
        {Object.values(songs).map((singleSong) => {
          return sessionUser.id === singleSong.userId ? (
            <div className="allIndividualSongs" key={`${singleSong.id}SongDiv`}>
              <NavLink
                className="songCardsSongName"
                key={`${singleSong.id}SongNav`}
                to={`/songs/${singleSong.id}`}
              >
                {singleSong.title}
              </NavLink>
              <div>Comments: {singleSong.Comments.length}</div>
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
                  value={selectedPlaylist}
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
              <div>
                <button
                  key={`${singleSong.id}SongPlay`}
                  onClick={(e) => {
                    audioFunction(singleSong);
                  }}
                >
                  Play Song
                </button>
                <button
                  key={`${singleSong.id}SongDelete`}
                  onClick={(e) => {
                    handleDelete(singleSong);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div key={`${singleSong.id}SongDiv`}></div>
          );
        })}
      </div>
    </div>
  );
}

export default MyHome;
