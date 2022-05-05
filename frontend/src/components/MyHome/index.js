import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { deleteOldSong } from "../../store/audioFile";

import Navigation from "../Navigation";
import "./MyHome.css";

function MyHome() {
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
            <div key={`${singleSong.id}SongDiv`}>
              <NavLink
                key={`${singleSong.id}SongNav`}
                to={`/songs/${singleSong.id}`}
              >
                {singleSong.title}
              </NavLink>
              <button
                key={`${singleSong.id}SongPlay`}
                onClick={(e) => {
                  audiofunction(singleSong);
                }}
              >
                Play Song
              </button>
              <button
                key={`${singleSong.id}SongDelete`}
                onClick={(e) => {
                  handleDelete(singleSong);
                }}
              >
                Delete
              </button>
            </div>
          ) : (
            <div key={`${singleSong.id}SongDiv`}></div>
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
          layout="horizontal-reverse"
        />
      </footer>
    </div>
  );
}

export default MyHome;
