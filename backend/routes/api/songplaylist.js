const express = require("express");
const db = require("../../db/models");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { playlistId, song } = req.body;
  const songId = song.id;

  const newAssociation = await db.SongPlaylist.build({
    playlistId,
    songId,
  });

  const oldAssociation = await db.SongPlaylist.findOne({
    where: { playlistId, songId },
  });

  if (!oldAssociation) {
    if (newAssociation) {
      await newAssociation.save();
      return res.json(newAssociation);
    }
  }
});

router.delete("/", async (req, res, next) => {
  const { song, playlist } = req.body;
  const playlistId = playlist.id;
  const songId = song.id;
  const oldAssociation = await db.SongPlaylist.findOne({
    where: { playlistId, songId },
  });

  await oldAssociation.destroy();

  return res.json(oldAssociation);
});

module.exports = router;
