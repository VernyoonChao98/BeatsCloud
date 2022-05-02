"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      context: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      songId: DataTypes.INTEGER,
    },
    {}
  );
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: "userId" });
    Comment.belongsTo(models.Song, { foreignKey: "songId" });
  };
  return Comment;
};
