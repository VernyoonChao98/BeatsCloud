"use strict";
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    "Song",
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      albumId: DataTypes.INTEGER,
      songUrl: DataTypes.STRING,
    },
    {}
  );
  Song.associate = function (models) {
    // associations can be defined here
    Song.belongsTo(models.User, { foreignKey: "userId" });
    Song.belongsTo(models.Album, {
      foreignKey: "albumId",
    });

    Song.hasMany(models.Comment, {
      foreignKey: "songId",
      onDelete: "CASCADE",
      hooks: true,
    });

    const columnMapping = {
      through: "SongPlaylist",
      otherKey: "playlistId",
      foreignKey: "songId",
    };
    Song.belongsToMany(models.Playlist, columnMapping);
  };
  return Song;
};
