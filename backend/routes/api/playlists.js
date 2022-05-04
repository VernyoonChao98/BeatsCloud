const express = require("express");
const db = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

router.get("/", async (req, res, next) => {
  const allPlaylists = await db.Playlist.findAll();
  return res.json(allPlaylists);
});

router.post("/", async (req, res, next) => {
  const { userId, title } = req.body;
  const newPlaylist = await db.Playlist.build({
    userId,
    title,
  });
  if (newPlaylist) {
    await newPlaylist.save();
    return res.json(newPlaylist);
  }
});

router.put("/", async (req, res) => {
  console.log("hello from bruuuuuuuuuuuuuuuuuuuuu");
  console.log(req.body);
  const { playlistId, playlistTitle } = req.body;

  const playlistToEdit = await db.Playlist.findByPk(playlistId);

  const response = await playlistToEdit.update({
    title: playlistTitle,
  });
  return res.json(response);
});

router.delete("/:id", async (req, res, next) => {
  const playlistId = req.params.id;

  // Deletes all association from the join table
  const allAssociations = await db.SongPlaylist.findAll({
    where: { playlistId: playlistId },
  });

  allAssociations.forEach((playlistAssociation) => {
    playlistAssociation.destroy();
  });
  const playlistToDelete = await db.Playlist.findByPk(playlistId);
  await playlistToDelete.destroy();
  return res.json({ message: "Successfully Deleted." });
});

module.exports = router;
