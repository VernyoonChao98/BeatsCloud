import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAudio } from "../../store/uploadFile";

function UploadButton() {
  const dispatch = useDispatch();
  const hiddenFileInput = React.useRef(null);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    console.log(fileUploaded.name);

    setFile(fileUploaded);
    setFileName(fileUploaded.name);

    dispatch(addNewAudio(fileUploaded));
  };

  return (
    <div>
      <button onClick={handleClick}>Upload a mp3/mp4</button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default UploadButton;
