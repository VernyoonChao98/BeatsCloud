import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { addNewSong, loadAllSongs } from "../../store/audioFile";
import Navigation from "../Navigation";

function UploadButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const userId = sessionUser.id;
    const payload = {
      userId,
      fileName,
      file,
    };
    const createdNewSong = await dispatch(addNewSong(payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        } else if (data && data.message) {
          setErrors([data.message]);
        }
      }
    );
    if (createdNewSong) {
      await dispatch(loadAllSongs());
      history.push("/myHome");
    }
  };

  const handleChange = async (e) => {
    const fileUploaded = e.target.files[0];
    setFile(fileUploaded);
  };

  return (
    <div id="noTopBorder" className="wholeContent">
      <Navigation user={sessionUser} />
      <div className="audioUploadContainer">
        <form id="audio" onSubmit={handleSubmit}>
          {errors.map((error, idx) => (
            <div className="errors" key={idx}>
              {error}
            </div>
          ))}
          <label id="songTitle" htmlFor="nameOfAudioFile">
            Song Title
            <input
              type="text"
              name="nameOfAudioFile"
              value={fileName}
              required
              onChange={(e) => setFileName(e.target.value)}
            />
          </label>
          <div className="fileInput">
            <label className="fileInput">
              <div>Select a Song</div>
              <input
                type="file"
                name="audio"
                id="fileInput"
                // style={{ display: "none" }}
                onChange={handleChange}
                accept=".mp3, .mp4"
              />
            </label>
          </div>
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadButton;
