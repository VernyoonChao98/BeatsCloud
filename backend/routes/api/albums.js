const express = require("express");
const db = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

router.get("/", async (req, res, next) => {
  const allAlbums = await db.Album.findAll({
    include: [{ model: db.User }, { model: db.Song }],
  });

  if (allAlbums) {
    return res.json(allAlbums);
  }
});

module.exports = router;
