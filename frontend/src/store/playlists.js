import { csrfFetch } from "./csrf";

const LOAD_PLAYLISTS = "/api/LOADPLAYLISTS";
const ADD_PLAYLIST = "/api/ADDPLAYLIST";
const EDIT_PLAYLIST = "/api/EDITPLAYLIST";
const DELETE_PLAYLIST = "/api/DELETEPLAYLIST";

const ADD_SONGPLAYLISTS = "/api/ADDSONGPLAYLISTS";

const loadPlaylists = (playlists) => ({
  type: LOAD_PLAYLISTS,
  playlists,
});

const addPlaylist = (playlist) => ({
  type: ADD_PLAYLIST,
  playlist,
});

const editPlaylist = (playlist) => ({
  type: EDIT_PLAYLIST,
  playlist,
});

const deletePlaylist = (playlist) => ({
  type: DELETE_PLAYLIST,
  playlist,
});

const createSongPlaylist = (association, song) => ({
  type: ADD_SONGPLAYLISTS,
  association,
  song,
});

export const deleteSongPlaylistAssociation = (payload) => async (dispatch) => {
  payload = JSON.stringify(payload);
  const response = await csrfFetch("/api/songplaylists", {
    method: "DELETE",
    body: payload,
  });
};

export const createSongPlaylistAssociation =
  (association) => async (dispatch) => {
    const song = association.song;
    association = JSON.stringify(association);
    const response = await csrfFetch("/api/songplaylists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: association,
    });

    if (response.ok) {
      const newAssociation = await response.json();
      console.log(newAssociation);
      dispatch(createSongPlaylist(newAssociation, song));
    }
  };

export const loadAllPlaylist = () => async (dispatch) => {
  const response = await csrfFetch("/api/playlists", {
    method: "GET",
  });
  if (response.ok) {
    const allPlaylists = await response.json();
    dispatch(loadPlaylists(allPlaylists));
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

export const editNewPlaylist = (playlist) => async (dispatch) => {
  playlist = JSON.stringify(playlist);

  console.log(playlist);
  const response = await csrfFetch("/api/playlists", {
    method: "PUT",
    headers: { ContentType: "application/json" },
    body: playlist,
  });

  if (response.ok) {
    const newPlaylistEdit = await response.json();
    console.log(newPlaylistEdit);
    dispatch(editPlaylist(newPlaylistEdit));
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
  let Songs = [];
  switch (action.type) {
    case ADD_SONGPLAYLISTS:
      newState[action.association.playlistId].Songs.push(action.song);
      return newState;
    case LOAD_PLAYLISTS:
      action.playlists.forEach(
        (playlist) => (newState[playlist.id] = playlist)
      );
      return newState;
    case ADD_PLAYLIST:
      return { ...state, [action.playlist.id]: { ...action.playlist, Songs } };
    case EDIT_PLAYLIST:
      Songs = [...newState[action.playlist.id].Songs];
      return { ...state, [action.playlist.id]: { ...action.playlist, Songs } };
    case DELETE_PLAYLIST:
      delete newState[action.playlist.id];
      return newState;
    default:
      return state;
  }
};

export default playlistReducer;
