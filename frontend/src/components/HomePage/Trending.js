import React from "react";
import { useSelector } from "react-redux";

function Trending({ audioFunction }) {
  const songs = useSelector((state) => state.audioFile);
  const trendingSongs = [];
  for (let i = 0; i < 12; i++) {
    trendingSongs.push(Object.values(songs)[i]);
  }
  console.log(trendingSongs);
  return (
    <div className="trendingContainer">
      <p className="trendingText">
        Hear what’s trending for free in the Beatscloud community
      </p>
      <div className="allTrendingSongsContainer">
        {trendingSongs.map((song) => {
          return (
            <div key={`${song.id}TrendingSong`} className="trendingSongs">
              {song.title}
              <button
                key={song.id}
                onClick={(e) => {
                  audioFunction(song);
                }}
              >
                Play Song
              </button>
            </div>
          );
        })}
        <button className="button" id="trendingButton">
          Explore trending playlists
        </button>
      </div>
    </div>
  );
}

export default Trending;
