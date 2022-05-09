"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "SongPlaylists",
      [
        {
          playlistId: 1,
          songId: 1,
        },
        {
          playlistId: 1,
          songId: 2,
        },
        {
          playlistId: 1,
          songId: 3,
        },
        {
          playlistId: 1,
          songId: 4,
        },
        {
          playlistId: 1,
          songId: 5,
        },
        {
          playlistId: 1,
          songId: 6,
        },
        {
          playlistId: 1,
          songId: 7,
        },
        {
          playlistId: 1,
          songId: 8,
        },
        {
          playlistId: 1,
          songId: 9,
        },
        {
          playlistId: 1,
          songId: 10,
        },
        {
          playlistId: 1,
          songId: 11,
        },
        {
          playlistId: 1,
          songId: 12,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("SongPlaylists", null, {});
  },
};
