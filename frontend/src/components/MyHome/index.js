import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

import { deleteOldSong } from "../../store/audioFile";

import Navigation from "../Navigation";

function MyHome({ audioFunction }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.audioFile);
  if (!sessionUser) return <Redirect to="/" />;

  const handleDelete = (singleSong) => {
    dispatch(deleteOldSong(singleSong));
  };

  return (
    <div id="noTopBorder" className="wholeContent">
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
                  audioFunction(singleSong);
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
    </div>
  );
}

export default MyHome;
