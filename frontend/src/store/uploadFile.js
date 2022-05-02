import { csrfFetch } from "./csrf";

const ADD_AUDIO = "/api/ADDAUDIO";

const addAudio = (audioFile) => ({
  type: ADD_AUDIO,
  audioFile,
});

export const addNewAudio = (audioFile) => async (dispatch) => {
  console.log("hello from here");
  const formData = new FormData();
  formData.append("audio", audioFile);
  console.log(formData);
  const response = await csrfFetch("/api/audio/upload", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addAudio);
  }
};

const initialState = { audioFile: null };

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_AUDIO:
      return { ...state, audioFile: action.audioFile };
    default:
      return state;
  }
};

export default audioReducer;
