import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editNewSong } from "../../../store/audioFile";

function EditSongForm({ setShowModal }) {
  const dispatch = useDispatch();
  const songId = useParams().id;
  const song = useSelector((state) => state.audioFile[songId]);
  const [songTitle, setSongTitle] = useState(`${song.title}`);
  const [errors, setErrors] = useState([]);

  const handleSongSubmit = async (e) => {
    e.preventDefault();
    const editSong = {
      songId,
      songTitle,
    };
    const newEditSong = await dispatch(editNewSong(editSong)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        } else if (data && data.message) {
          setErrors([data.message]);
        }
      }
    );

    if (newEditSong) {
      setShowModal(false);
    }
  };

  return (
    <div>
      EditSongForm
      <form onSubmit={handleSongSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
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
