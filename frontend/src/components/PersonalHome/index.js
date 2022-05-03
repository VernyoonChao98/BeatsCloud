import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { restoreUser } from "../../store/session";
import { loadAllSongs } from "../../store/uploadFile";
import Navigation from "./Navigation";
import UploadButton from "./UploadButton";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./PersonalHome.css";

function PersonalHome() {
  const sessionUser = useSelector((state) => state.session.user);
  const [currentAudio, setCurrentAudio] = useState(
    "https://beatscloudclone.s3.amazonaws.com/1651534605934.mp4"
  );

  const dispatch = useDispatch();

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div>
      <h2>PersonalHome</h2>
      <NavLink exact to="/">
        Home
      </NavLink>
      <Navigation user={sessionUser} />
      <UploadButton user={sessionUser} />
      <footer>
        <AudioPlayer
          src={currentAudio}
          onPlay={(e) =>
            setCurrentAudio(
              "https://beatscloudclone.s3.us-west-1.amazonaws.com/1651527807760.mp4"
            )
          }
        />
      </footer>
    </div>
  );
}

export default PersonalHome;
