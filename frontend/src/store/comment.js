import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = "/api/LOADCOMMENTS";
const ADD_COMMENT = "/api/ADDCOMMENT";
const DELETE_COMMENT = "/api/DELETECOMMENT";

const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments,
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

const removeComment = (comment) => ({
  type: DELETE_COMMENT,
  comment,
});

export const loadAllComments = (song) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${song.id}`, {
    method: "GET",
  });

  if (response.ok) {
    const allComments = await response.json();
    dispatch(loadComments(allComments));
  }
};

export const createComment = (payload) => async (dispatch) => {
  payload = JSON.stringify(payload);
  const response = await csrfFetch("/api/comments", {
    method: "POST",
    headers: { ContentType: "application/json" },
    body: payload,
  });

  if (response.ok) {
    const newComment = await response.json();
    dispatch(addComment(newComment));
  }
};

export const deleteComment = (payload) => async (dispatch) => {
  console.log(payload);
  const commentId = payload.comment.id;
  console.log(commentId);
  console.log("hello from thunkyyyy");
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeComment(payload.comment));
  }
};

const initialState = {};

const commentReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_COMMENTS:
      newState = {};
      action.comments.forEach((comment) => (newState[comment.id] = comment));
      return newState;
    case ADD_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    case DELETE_COMMENT:
      delete newState[action.comment.id];
      return newState;
    default:
      return state;
  }
};

export default commentReducer;
