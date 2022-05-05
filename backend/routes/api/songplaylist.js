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

module.exports = router;
