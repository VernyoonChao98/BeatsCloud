import React, { useState } from "react";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editNewSong } from "../../store/audioFile";

function EditSongPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const songId = useParams().id;
  const song = useSelector((state) => state.audioFile[songId]);
  const [songTitle, setSongTitle] = useState(`${song.title}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editSong = {
      songId,
      songTitle,
    };
    await dispatch(editNewSong(editSong));
    history.push("/myHome");
  };

  return (
    <div className="wholeContent">
      <Navigation />
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Submit</button>
        </label>
      </form>
    </div>
  );
}

export default EditSongPage;
