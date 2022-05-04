import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import AudioPlayer from "react-h5-audio-player";
import { deleteOldSong } from "../../store/uploadFile";
import "react-h5-audio-player/lib/styles.css";
import "./PersonalHome.css";

function PersonalHome() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.audioFile);
  const [song, setSong] = useState("");
  const player = useRef();
  if (!sessionUser) return <Redirect to="/" />;

  const audiofunction = async (singleSong) => {
    await setSong(`${singleSong.songUrl}`);
    player.current.audio.current.play(song);
  };

  const handleDelete = (singleSong) => {
    dispatch(deleteOldSong(singleSong));
  };

  return (
    <div className="wholeContent">
      <Navigation user={sessionUser} />
      <div className="allSongs">
        {Object.values(songs).map((singleSong) => {
          return sessionUser.id === singleSong.userId ? (
            <div key={singleSong.id}>
              <NavLink to={`/songs/${singleSong.id}`}>
                {singleSong.title}
              </NavLink>
              <button
                onClick={(e) => {
                  audiofunction(singleSong);
                }}
              >
                Play Song
              </button>
              <button
                onClick={(e) => {
                  handleDelete(singleSong);
                }}
              >
                Delete
              </button>
            </div>
          ) : (
            <></>
          );
        })}
      </div>
      <footer id="footer">
        <AudioPlayer
          id="musicPlayer"
          src={`${song}`}
          onPlay={(e) => console.log("Playing")}
          ref={player}
          volume={0.1}
        />
      </footer>
    </div>
  );
}

export default PersonalHome;
