import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { editNewSong } from "../../../store/audioFile";

function EditSongForm({ setShowModal }) {
  const dispatch = useDispatch();
  const songId = useParams().id;
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.audioFile[songId]);
  const [songTitle, setSongTitle] = useState(`${song.title}`);

  const handleSongSubmit = async (e) => {
    e.preventDefault();
    const editSong = {
      songId,
      songTitle,
    };
    await dispatch(editNewSong(editSong));
    setShowModal(false);
  };

  return (
    <div>
      EditSongForm
      <form onSubmit={handleSongSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={songTitle}
            onChange={(e) => {
              setSongTitle(e.target.value);
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditSongForm;
