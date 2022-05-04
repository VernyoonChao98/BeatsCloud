import { csrfFetch } from "./csrf";

const LOAD_SONGS = "/api/LOADSONGS";
const ADD_SONG = "/api/ADDSONG";
const EDIT_SONG = "/api/EDITSONG";
const DELETE_SONG = "/api/DELETESONG";

const loadSongs = (songs) => ({
  type: LOAD_SONGS,
  songs,
});

const addSong = (audioFile) => ({
  type: ADD_SONG,
  audioFile,
});

const editSong = (song) => ({
  type: EDIT_SONG,
  song,
});

const deleteSong = (song) => ({
  type: DELETE_SONG,
  song,
});

export const loadAllSongs = () => async (dispatch) => {
  const response = await csrfFetch("/api/audio/Songs", {
    method: "GET",
  });

  if (response.ok) {
    const songs = await response.json();
    dispatch(loadSongs(songs));
    return songs;
  }
};

export const addNewSong = (audioFile) => async (dispatch) => {
  const formData = new FormData();
  formData.append("audio", audioFile.file);
  formData.append("fileName", audioFile.fileName);
  formData.append("userId", audioFile.userId);

  const response = await csrfFetch("/api/audio/Songs", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  if (response.ok) {
    const newSong = await response.json();
    dispatch(addSong(newSong));
  }
};

export const editNewSong = (songEdit) => async (dispatch) => {
  songEdit = JSON.stringify(songEdit);

  const response = await csrfFetch("/api/audio/Songs", {
    method: "PUT",
    headers: { ContentType: "application/json" },
    body: songEdit,
  });

  if (response.ok) {
    const newSongEdit = await response.json();
    dispatch(editSong(newSongEdit));
  }
};

export const deleteOldSong = (song) => async (dispatch) => {
  const response = await csrfFetch(`/api/audio/Songs/${song.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSong(song));
  }
};

const initialState = {};

const audioReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_SONG:
      return { ...state, [action.audioFile.id]: { ...action.audioFile } };
    case LOAD_SONGS:
      action.songs.forEach((song) => (newState[song.id] = song));
      return newState;
    case EDIT_SONG:
      return { ...state, [action.song.id]: { ...action.song } };
    case DELETE_SONG:
      delete newState[action.song.id];
      return newState;
    default:
      return state;
  }
};

export default audioReducer;
