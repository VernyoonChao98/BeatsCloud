// import { csrfFetch } from "./csrf";

// const ADD_SONGPLAYLITS = "/api/ADDSONGPLAYLITS";

// const createSongPlaylist = (association) => ({
//   type: ADD_SONGPLAYLITS,
//   association,
// });

// export const createSongPlaylistAssociation =
//   (association) => async (dispatch) => {
//     association = JSON.stringify(association);
//     const response = await csrfFetch("/api/songplaylists", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: association,
//     });

//     if (response.ok) {
//       const newAssociation = await response.json();
//     }
//   };

// const initialState = {};

// const songPlaylistReducer = (state = initialState, action) => {
//   const newState = { ...state };
//   switch (action.type) {
//     case ADD_SONGPLAYLITS:
//       return { ...state, [action.association.id]: { ...action.association } };
//     default:
//       return state;
//   }
// };

// export default songPlaylistReducer;
