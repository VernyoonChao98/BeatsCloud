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
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    const userId = sessionUser.id;
    const payload = {
      userId,
      title,
    };

    const newPlaylist = await dispatch(createNewPlaylist(payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        } else if (data && data.message) {
          setErrors([data.message]);
        }
      }
    );

    if (newPlaylist) {
      history.push("/playlists");
    }
  };

  return (
    <div className="wholeContent">
      <Navigation user={sessionUser} />
      CreatePlaylistPage
      <form onSubmit={handleCreatePlaylist}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
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
