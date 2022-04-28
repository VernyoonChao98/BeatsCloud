import { csrfFetch } from "./csrf";

const ADD_SESSION = "/api/SESSION";
const REMOVE_SESSION = "/api/REMOVESESSION";

const addSession = (user) => ({
  type: ADD_SESSION,
  user,
});

const removeSession = () => ({
  type: REMOVE_SESSION,
});

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(addSession(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SESSION:
      return { ...state, user: action.user };
    case REMOVE_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
