"use strict";
module.exports = (sequelize, DataTypes) => {
  const SongPlaylist = sequelize.define(
    "SongPlaylist",
    {
      playlistId: DataTypes.INTEGER,
      songId: DataTypes.INTEGER,
    },
    {}
  );
  SongPlaylist.associate = function (models) {
    // associations can be defined here
  };
  return SongPlaylist;
};
