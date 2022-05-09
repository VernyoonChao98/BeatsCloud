import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadAllSongs } from "../../store/audioFile";

function Trending({ audioFunction, audioFunctionPlaylist }) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const songs = useSelector((state) => state.audioFile);

  useEffect(() => {
    dispatch(loadAllSongs()).then(() => setIsLoaded(true));
  }, [dispatch, isLoaded]);

  const trendingSongs = [];
  for (let i = 0; i < 12; i++) {
    trendingSongs.push(Object.values(songs)[i]);
  }

  const playTrendingSongs = (e) => {
    const Songs = [...trendingSongs];
    const trendingPlaylist = { Songs };
    audioFunctionPlaylist(trendingPlaylist);
  };

  return (
    isLoaded && (
      <div className="trendingContainer">
        <p className="trendingText">
          Hear what’s trending in the Beatscloud community
        </p>
        <div className="allTrendingSongsContainer">
          {trendingSongs?.map((song) => {
            return (
              <div key={`${song?.id}TrendingSong`} className="trendingSongs">
                <p>{song?.title}</p>
                <div
                  className="playTrendingSong"
                  key={song?.id}
                  onClick={(e) => {
                    audioFunction(song);
                  }}
                ></div>
              </div>
            );
          })}
          <button
            onClick={playTrendingSongs}
            className="button"
            id="trendingButton"
          >
            My favorite 12 Songs
          </button>
        </div>
      </div>
    )
  );
}

export default Trending;
