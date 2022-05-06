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

import { Modal } from "../../context/Modal";
import EditSongForm from "./EditSongForm";

function EditSongPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const songId = useParams().id;
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.audioFile[songId]);
  const comments = useSelector((state) => state.comment);
  const [showModal, setShowModal] = useState(false);
  const [songTitle, setSongTitle] = useState(`${song.title}`);
  const [comment, setComment] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadAllComments(song)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;

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
    const payload = {
      comment,
    };
    await dispatch(deleteComment(payload));
  };

  return (
    isLoaded && (
      <div id="noTopBorder" className="wholeContent">
        <Navigation user={sessionUser} />
        <p>{song.title}</p>
        <div>
          <button
            className="button"
            id="createAccountButton"
            onClick={() => setShowModal(true)}
          >
            Edit Song
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <EditSongForm setShowModal={setShowModal} />
            </Modal>
          )}
        </div>
        <p>Comments</p>
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
    )
  );
}

export default EditSongPage;
