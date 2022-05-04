import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { addNewSong } from "../../store/uploadFile";
import Navigation from "../PersonalHome/Navigation";

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
      history.push("/myHome");
    }
  };

  const handleChange = async (e) => {
    const fileUploaded = e.target.files[0];
    setFile(fileUploaded);
  };

  return (
    <div className="wholeContent">
      <Navigation user={sessionUser} />
      <form id="audio" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label htmlFor="audio">Choose a mp3/mp4 file</label>
        <input
          type="file"
          name="audio"
          onChange={handleChange}
          accept=".mp3, .mp4"
        />
        <label htmlFor="nameOfAudioFile">Title</label>
        <input
          type="text"
          name="nameOfAudioFile"
          value={fileName}
          required
          onChange={(e) => setFileName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UploadButton;
