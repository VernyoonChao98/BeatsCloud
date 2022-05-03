import { csrfFetch } from "./csrf";

const LOAD_SONGS = "/api/LOADSONGS";
const ADD_SONG = "/api/ADDSONG";

const loadSongs = (songs) => ({
  type: LOAD_SONGS,
  songs,
});

const addSong = (audioFile) => ({
  type: ADD_SONG,
  audioFile,
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

const initialState = {};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SONG:
      return { ...state, [action.audioFile.id]: { ...action.audioFile } };
    case LOAD_SONGS:
      const newState = { ...state };
      action.songs.forEach((song) => (newState[song.id] = song));
      return newState;
    default:
      return state;
  }
};

export default audioReducer;
