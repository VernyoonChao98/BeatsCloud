const express = require("express");
const db = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

router.get("/:id", async (req, res, next) => {
  const songId = req.params.id;

  const allComments = await db.Comment.findAll({
    include: db.User,
    where: { songId },
  });
  if (allComments) {
    return res.json(allComments);
  }
});

router.post("/", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
  let commentId = req.params.id;
  commentId = parseInt(commentId);

  const oldComment = await db.Comment.findByPk(commentId);

  if (oldComment) {
    await oldComment.destroy();
    return res.json({ message: "Successfully Deleted." });
  }
});

module.exports = router;
