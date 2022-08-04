import { csrfFetch } from "./csrf";

const LOAD_ALBUMS = "/api/LOAD_ALBUMS";

export const loadAlbums = (payload) => ({
  type: LOAD_ALBUMS,
  payload,
});

export const loadAllAlbums = () => async (dispatch) => {
  const response = await csrfFetch("/api/albums", {
    method: "GET",
  });

  if (response.ok) {
    const albums = await response.json();
    dispatch(loadAlbums(albums));
    return albums;
  }
};

const initialState = {};

const albumReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_ALBUMS:
      action.payload.forEach((album) => (newState[album.id] = album));
      return newState;
    default:
      return state;
  }
};

export default albumReducer;
