import React, { useState } from "react";
import Navigation from "../Navigation";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import {
  loadAllPlaylist,
  deleteSongPlaylistAssociation,
  editNewPlaylist,
} from "../../store/playlists";

function EditPlaylistPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const playlistId = useParams().id;
  const playlist = useSelector((state) => state.playlist[playlistId]);
  const [playlistTitle, setPlaylistTitle] = useState(`${playlist.title}`);

  const songs = playlist.Songs;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editPlaylist = {
      playlistId,
      playlistTitle,
    };
    await dispatch(editNewPlaylist(editPlaylist));
    history.push("/playlists");
  };

  const handleRemoveFromPlaylist = async (e, song, playlist) => {
    e.preventDefault();
    const payload = {
      song,
      playlist,
    };
    await dispatch(deleteSongPlaylistAssociation(payload));
    await dispatch(loadAllPlaylist());
  };

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="wholeContent">
      <Navigation user={sessionUser} />
      Playlist Edit Form
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={playlistTitle}
            onChange={(e) => {
              setPlaylistTitle(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </label>
      </form>
      {songs.map((song) => {
        return (
          <div key={song.id}>
            {song.title}
            <button
              onClick={(e) => handleRemoveFromPlaylist(e, song, playlist)}
            >
              Remove From Playlist
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default EditPlaylistPage;
