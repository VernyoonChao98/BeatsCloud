import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import { deleteOldPlaylist } from "../../store/playlists";

import Navigation from "../Navigation";

function PlaylistsPage({ audioFunctionPlaylist }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const playlists = useSelector((state) => state.playlist);

  if (!sessionUser) return <Redirect to="/" />;

  const handleRouteCreatePlaylist = (e) => {
    history.push("/playlists/create");
  };

  const handleDelete = async (e, singlePlaylist) => {
    e.preventDefault();
    await dispatch(deleteOldPlaylist(singlePlaylist));
  };

  return (
    <div id="noTopBorder" className="wholeContent">
      <Navigation user={sessionUser} />
      <div className="playlistInfoDiv">
        Your Playlists:
        {
          Object.values(playlists).filter(
            (playlist) => sessionUser.id === playlist.userId
          ).length
        }
        <button
          className="createPlaylistButton"
          onClick={handleRouteCreatePlaylist}
        >
          Create a new Playlist
        </button>
      </div>
      {Object.values(playlists).map((singlePlaylist) => {
        return sessionUser.id === singlePlaylist.userId ? (
          <div className="playlistContainer" key={singlePlaylist.id}>
            <NavLink
              className="playlistName"
              to={`/playlists/${singlePlaylist.id}`}
            >
              <p>{singlePlaylist.title}</p>
              <p>Songs: {singlePlaylist.Songs.length}</p>
            </NavLink>
            <div className="songsUnderPlaylist">
              {singlePlaylist.Songs?.map((song, index) => {
                return <div key={index}>{song.title}</div>;
              })}
            </div>
            <div>
              <button
                onClick={(e) => {
                  audioFunctionPlaylist(singlePlaylist);
                }}
              >
                Play Playlist
              </button>
              <button
                onClick={(e) => {
                  handleDelete(e, singlePlaylist);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <></>
        );
      })}
    </div>
  );
}

export default PlaylistsPage;
