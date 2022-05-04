import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import Navigation from "../Navigation";

function DiscoverPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.audioFile);
  const [song, setSong] = useState("");
  const player = useRef();

  if (!sessionUser) return <Redirect to="/" />;

  const audiofunction = async (singleSong) => {
    await setSong(`${singleSong.songUrl}`);
    player.current.audio.current.play(song);
  };

  return (
    <div className="wholeContent">
      <Navigation user={sessionUser} />
      <div className="allSongs">
        {Object.values(songs).map((singleSong) => {
          return (
            <div key={singleSong.id}>
              <NavLink to={`/songs/${singleSong.id}`}>
                {singleSong.title}
              </NavLink>
              <button
                key={singleSong.id}
                onClick={(e) => {
                  audiofunction(singleSong);
                }}
              >
                Play Song
              </button>
            </div>
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

export default DiscoverPage;
