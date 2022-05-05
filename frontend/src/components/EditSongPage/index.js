import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { editNewSong } from "../../store/audioFile";
import {
  createComment,
  loadAllComments,
  deleteComment,
} from "../../store/comment";

function EditSongPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const songId = useParams().id;
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.audioFile[songId]);
  const comments = useSelector((state) => state.comment);
  const [songTitle, setSongTitle] = useState(`${song.title}`);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(loadAllComments(song));
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSongSubmit = async (e) => {
    e.preventDefault();
    const editSong = {
      songId,
      songTitle,
    };
    await dispatch(editNewSong(editSong));
    history.push("/myHome");
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      sessionUser,
      comment,
      song,
    };
    await dispatch(createComment(payload));
    setComment("");
  };

  const handleDeleteComment = async (e, comment) => {
    e.preventDefault();
    console.log(comment);
    const payload = {
      comment,
    };
    await dispatch(deleteComment(payload));
  };

  return (
    <div className="wholeContent">
      <Navigation user={sessionUser} />
      <form onSubmit={handleSongSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={songTitle}
            onChange={(e) => {
              setSongTitle(e.target.value);
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      Comments
      {Object.values(comments).map((comment) => {
        return sessionUser.id === comment.userId ? (
          <div key={comment.id}>
            <div>{sessionUser.username}</div>
            <p>{comment.context}</p>
            <button
              onClick={(e) => {
                handleDeleteComment(e, comment);
              }}
            >
              delete
            </button>
            <button>edit</button>
          </div>
        ) : (
          <div key={comment.id}>
            <div>User: {comment.User.username}</div>
            <p>{comment.context}</p>
            {comment.context}
          </div>
        );
      })}
      <form onSubmit={handleCommentSubmit}>
        <label>
          Comment
          <input
            type="text"
            name="title"
            required
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditSongPage;
