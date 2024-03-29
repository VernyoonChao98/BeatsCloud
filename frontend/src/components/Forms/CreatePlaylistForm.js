import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import { createNewPlaylist } from "../../store/playlists";

function CreatePlaylistForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

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
  };

  return (
    <div>
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

export default CreatePlaylistForm;
