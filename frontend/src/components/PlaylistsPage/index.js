import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import { deleteOldPlaylist } from "../../store/playlists";

import Navigation from "../Navigation";

function PlaylistsPage() {
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
      PlaylistsPage
      {Object.values(playlists).map((singlePlaylist) => {
        return sessionUser.id === singlePlaylist.userId ? (
          <div key={singlePlaylist.id}>
            <NavLink to={`/playlists/${singlePlaylist.id}`}>
              {singlePlaylist.title}
            </NavLink>
            <button
              onClick={(e) => {
                handleDelete(e, singlePlaylist);
              }}
            >
              delete
            </button>
            <div className="songsUnderPlaylist">
              {singlePlaylist.Songs?.map((song, index) => {
                return <div key={index}>{song.title}</div>;
              })}
            </div>
          </div>
        ) : (
          <></>
        );
      })}
      <button onClick={handleRouteCreatePlaylist}>Create a new Playlist</button>
    </div>
  );
}

export default PlaylistsPage;
