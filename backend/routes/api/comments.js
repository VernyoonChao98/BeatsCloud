const express = require("express");
const db = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

router.get("/:id", async (req, res, next) => {
  console.log("hello from back end");
  const songId = req.params.id;

  const allComments = await db.Comment.findAll({ where: { songId } });
  if (allComments) {
    return res.json(allComments);
  }
});

router.post("/", async (req, res, next) => {
  console.log("hello from backend");

  const { sessionUser, comment, song } = req.body;

  const userId = sessionUser.id;
  const context = comment;
  const songId = song.id;

  const newComment = await db.Comment.build({
    context,
    userId,
    songId,
  });

  if (newComment) {
    const returnNewComment = await newComment.save();
    return res.json(returnNewComment);
  }
});

module.exports = router;
