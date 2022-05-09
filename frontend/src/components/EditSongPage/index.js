import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import {
  createComment,
  loadAllComments,
  deleteComment,
} from "../../store/comment";

import { Modal } from "../../context/Modal";
import EditSongForm from "./EditSongForm";

function EditSongPage() {
  const dispatch = useDispatch();
  const songId = useParams().id;
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.audioFile[songId]);
  const comments = useSelector((state) => state.comment);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadAllComments(song)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, song, isLoaded]);

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
        {sessionUser.id === song.userId ? (
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
        ) : (
          <div></div>
        )}
        <p>{song.title}</p>
        <container className="allComments">
          {Object.values(comments).map((comment) => {
            return sessionUser.id === comment.userId ? (
              <div className="singleComment" key={comment.id}>
                <div>
                  <div className="usernameOwnerInfo">
                    <div className="userNameCommentInfo">
                      {sessionUser.username}
                    </div>
                    <div className="date">{comment.updatedAt.slice(0, 10)}</div>
                  </div>
                  <p className="commentText">{comment.context}</p>
                </div>
                <button
                  className="button"
                  id="deleteCommentButton"
                  onClick={(e) => {
                    handleDeleteComment(e, comment);
                  }}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className="singleComment" key={comment.id}>
                <div>
                  <div className="usernameOwnerInfo">
                    <div className="userNameCommentInfo">
                      {comment.User.username}
                    </div>
                    <div className="date">{comment.updatedAt.slice(0, 10)}</div>
                  </div>
                  <p className="commentText">{comment.context}</p>
                </div>
              </div>
            );
          })}
        </container>
        <form onSubmit={handleCommentSubmit}>
          <label>
            Comment
            <textarea
              type="text"
              name="title"
              rows={5}
              cols={100}
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
