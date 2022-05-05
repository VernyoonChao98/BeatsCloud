import { csrfFetch } from "./csrf";

const initialState = {};

const LOAD_COMMENTS = "/api/LOADCOMMENTS";
const ADD_COMMENT = "/api/ADDCOMMENT";

const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments,
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
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

const commentReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_COMMENTS:
      action.comments.forEach((comment) => (newState[comment.id] = comment));
      return newState;
    case ADD_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    default:
      return state;
  }
};

export default commentReducer;
