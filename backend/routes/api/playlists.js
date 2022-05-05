const express = require("express");
const db = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validatePlaylist = [
  check("title")
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Please provide a title with at least 3 or less than 51 characters."
    ),
  handleValidationErrors,
];

router.get("/", async (req, res, next) => {
  const allPlaylists = await db.Playlist.findAll({ include: db.Song });
  return res.json(allPlaylists);
});

router.post("/", validatePlaylist, async (req, res, next) => {
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
