const express = require("express");
const db = require("../../db/models");

const router = express.Router();

router.post("/", async (req, res, next) => {
  console.log("hello");
  console.log(req.body);
  const { playlistId, songId } = req.body;

  const newAssociation = await db.SongPlaylist.build({
    playlistId,
    songId,
  });

  if (newAssociation) {
    await newAssociation.save();
    return res.json(newAssociation);
  }
});

module.exports = router;
