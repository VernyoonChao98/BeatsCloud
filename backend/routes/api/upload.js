const express = require("express");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const db = require("../../db/models");

const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

require("dotenv").config();

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSong = [
  check("fileName")
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage("Please provide a title with at least 3 characters."),
  handleValidationErrors,
];

router.get("/Songs", async (req, res) => {
  const songs = await db.Song.findAll();
  return res.json(songs);
});

router.post(
  "/Songs",
  singleMulterUpload("audio"),
  validateSong,
  async (req, res, next) => {
    if (req.file) {
      if (
        req.file.mimetype === "video/mp4" ||
        req.file.mimetype === "video/mp3"
      ) {
        const file = req.file;
        const songUrl = await singlePublicFileUpload(file);
        const songTitle = req.body.fileName;
        const userId = req.body.userId;
        let albumId = req.body.albumId;
        if (!albumId) {
          albumId = null;
        }
        const newSong = await db.Song.build({
          title: songTitle,
          userId,
          albumId,
          songUrl,
        });
        if (newSong) await newSong.save();
        return res.json(newSong);
      } else {
        // throws an error if file type is not mp3/mp4
        const err = new Error("Invalid File Type.");
        next(err);
      }
    } else {
      // throws an error if no file was provided
      const err = new Error("Please Provide a File.");
      next(err);
    }
  }
);

module.exports = router;