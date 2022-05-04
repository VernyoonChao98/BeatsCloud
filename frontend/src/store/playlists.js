import { csrfFetch } from "./csrf";

const LOAD_PLAYLISTS = "/api/LOADPLAYLISTS";
const ADD_PLAYLIST = "/api/ADDPLAYLIST";
const DELETE_PLAYLIST = "/api/DELETEPLAYLIST";

const lostPlaylists = (playlists) => ({
  type: LOAD_PLAYLISTS,
  playlists,
});

const addPlaylist = (playlist) => ({
  type: ADD_PLAYLIST,
  playlist,
});

const deletePlaylist = (playlist) => ({
  type: DELETE_PLAYLIST,
  playlist,
});

export const loadAllPlaylist = () => async (dispatch) => {
  const response = await csrfFetch("/api/playlists", {
    method: "GET",
  });
  if (response.ok) {
    const allPlaylists = await response.json();
    dispatch(lostPlaylists(allPlaylists));
  }
};

export const createNewPlaylist = (playlist) => async (dispatch) => {
  const response = await csrfFetch("/api/playlists", {
    method: "POST",
    headers: { ContentType: "application/json" },
    body: JSON.stringify(playlist),
  });
  if (response.ok) {
    const newPlaylist = await response.json();
    dispatch(addPlaylist(newPlaylist));
  }
};

export const deleteOldPlaylist = (playlist) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${playlist.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deletePlaylist(playlist));
  }
};

const initialState = {};

const playlistReducer = (state = initialState, action) => {
  const newState = { ...state };
  console.log("wassup from reducer");
  switch (action.type) {
    case LOAD_PLAYLISTS:
      action.playlists.forEach(
        (playlist) => (newState[playlist.id] = playlist)
      );
      return newState;
    case ADD_PLAYLIST:
      return { ...state, [action.playlist.id]: { ...action.playlist } };
    case DELETE_PLAYLIST:
      delete newState[action.playlist.id];
      return newState;
    default:
      return state;
  }
};

export default playlistReducer;
