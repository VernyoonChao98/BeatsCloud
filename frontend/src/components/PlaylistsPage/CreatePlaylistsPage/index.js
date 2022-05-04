import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import Navigation from "../../Navigation";
import { createNewPlaylist } from "../../../store/playlists";

function CreatePlaylistPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");

  if (!sessionUser) return <Redirect to="/" />;

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    console.log(sessionUser.id);
    const userId = sessionUser.id;
    const payload = {
      userId,
      title,
    };

    await dispatch(createNewPlaylist(payload));

    history.push("/playlists");
  };

  return (
    <div className="wholeContent">
      <Navigation user={sessionUser} />
      CreatePlaylistPage
      <form onSubmit={handleCreatePlaylist}>
        <label htmlFor="nameOfPlaylist">Title</label>
        <input
          type="text"
          name="nameOfPlaylist"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePlaylistPage;
