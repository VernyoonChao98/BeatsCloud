import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import {
  addNewSong,
  addMultipleNewSongs,
  loadAllSongs,
} from "../../store/audioFile";
import Navigation from "../Navigation";

function UploadButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [newSongNames, setNewSongNames] = useState({});
  const [albumName, setAlbumName] = useState("");

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

  const handleMultipleSongsSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const userId = sessionUser.id;
    const payload = {
      userId,
      albumName,
      newSongNames,
      multipleFiles,
    };

    console.log(payload);

    const createdNewSongs = await dispatch(addMultipleNewSongs(payload));

    // const createdNewSong = await dispatch(addNewSong(payload)).catch(
    //   async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     } else if (data && data.message) {
    //       setErrors([data.message]);
    //     }
    //   }
    // );
    // if (createdNewSong) {
    //   await dispatch(loadAllSongs());
    //   history.push("/myHome");
    // }
  };

  const handleMultipleInputs = (e) => {
    let oldName = e.target.name;
    let newName = e.target.value;
    const newObj = { ...newSongNames };
    newObj[oldName] = newName;
    setNewSongNames({ ...newObj });
  };

  const updateSingleFile = async (e) => {
    const fileUploaded = e.target.files[0];
    setFile(fileUploaded);
  };

  const updateMultipleFiles = (e) => {
    const files = e.target.files;
    const newSongNames = {};
    for (let i = 0; i < files.length; i++) {
      newSongNames[files[i].name] = files[i].name;
    }
    setNewSongNames(newSongNames);
    setMultipleFiles(files);
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
                onChange={updateSingleFile}
                accept=".mp3, .mp4"
              />
            </label>
          </div>
          <button className="button" type="submit">
            Submit
          </button>
        </form>

        <div>Multiple upload</div>
        <form id="audio" onSubmit={handleMultipleSongsSubmit}>
          {errors.map((error, idx) => (
            <div className="errors" key={idx}>
              {error}
            </div>
          ))}
          <label id="songTitle" htmlFor="nameOfAudioFile">
            Album Name
            <input
              type="text"
              name="nameOfAudioFile"
              value={albumName}
              required
              onChange={(e) => setAlbumName(e.target.value)}
            />
          </label>
          {newSongNames ? (
            <>
              {Object.keys(newSongNames).map((file) => {
                return (
                  <label key={file} id="songTitle" htmlFor="nameOfAudioFile">
                    <input
                      type="text"
                      name={file}
                      value={newSongNames[file]}
                      required
                      onChange={handleMultipleInputs}
                    />
                  </label>
                );
              })}
            </>
          ) : null}
          <div className="fileInput">
            <label className="fileInput">
              <div>Select a Song</div>
              <input
                type="file"
                name="audio"
                multiple
                id="fileInput"
                // style={{ display: "none" }}
                onChange={updateMultipleFiles}
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
