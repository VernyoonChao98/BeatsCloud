const express = require("express");
const db = require("../../db/models");

const {
  singlePublicFileUpload,
  multiplePublicFileUpload,
  singleMulterUpload,
  multipleMulterUpload,
} = require("../../awsS3");

require("dotenv").config();

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSong = [
  check("fileName")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Too long of a Song Title"),
  handleValidationErrors,
];

const validateEditSong = [
  check("songTitle")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Too long of a Song Title"),
  handleValidationErrors,
];

router.get("/Songs", async (req, res) => {
  const songs = await db.Song.findAll({
    include: [{ model: db.User }, { model: db.Comment }],
  });
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
        req.file.mimetype === "video/mp3" ||
        req.file.mimetype === "audio/mpeg"
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
          songUrl,
        });

        if (newSong) {
          await newSong.save();
          return res.json(newSong);
        }
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

router.post(
  "/MultipleSongs",
  multipleMulterUpload("audios"),
  async (req, res, next) => {
    if (req.files) {
      const albumName = req.body.albumName;
      const userId = req.body.userId;
      const newAlbum = await db.Album.build({
        title: albumName,
        userId,
      });

      if (newAlbum) {
        await newAlbum.save();
      }

      // const newSongs = await multiplePublicFileUpload(req.files);

      // for (let i = 0; i < newSongs.length; i++) {
      //   console.log(req.files[i], newSongs[i]);
      // }

      req.files.forEach(async (file) => {
        if (file) {
          if (
            file.mimetype === "video/mp4" ||
            file.mimetype === "video/mp3" ||
            file.mimetype === "audio/mpeg"
          ) {
            const songUrl = await singlePublicFileUpload(file);
            const songTitle = file.originalname;
            const albumId = newAlbum.id;

            if (!albumId) {
              albumId = null;
            }

            const newSong = await db.Song.build({
              title: songTitle,
              userId,
              albumId,
              songUrl,
            });
            if (newSong) {
              await newSong.save();
            }
          }
        }
      });
    }
    // if (req.file) {
    //   if (
    //     req.file.mimetype === "video/mp4" ||
    //     req.file.mimetype === "video/mp3" ||
    //     req.file.mimetype === "audio/mpeg"
    //   ) {
    //     const file = req.file;
    //     const songUrl = await singlePublicFileUpload(file);
    //     const songTitle = req.body.fileName;
    //     const userId = req.body.userId;
    //     let albumId = req.body.albumId;
    //     if (!albumId) {
    //       albumId = null;
    //     }
    //     const newSong = await db.Song.build({
    //       title: songTitle,
    //       userId,
    //       albumId,
    //       songUrl,
    //     });
    //     if (newSong) {
    //       await newSong.save();
    //       return res.json(newSong);
    //     }
    //   } else {
    //     // throws an error if file type is not mp3/mp4
    //     const err = new Error("Invalid File Type.");
    //     next(err);
    //   }
    // } else {
    //   // throws an error if no file was provided
    //   const err = new Error("Please Provide a File.");
    //   next(err);
    // }
    return true;
  }
);

router.put("/Songs", validateEditSong, async (req, res) => {
  const { songId, songTitle } = req.body;
  const songToEdit = await db.Song.findByPk(songId);

  const newSongEdit = await songToEdit.update({
    title: songTitle,
  });

  if (newSongEdit) {
    return res.json(newSongEdit);
  }
});

router.delete("/Songs/:id", async (req, res) => {
  const songId = req.params.id;

  // Deletes all association from the join table
  const allAssociations = await db.SongPlaylist.findAll({
    where: { songId: songId },
  });

  allAssociations.forEach((songAssociation) => {
    songAssociation.destroy();
  });

  const songToDelete = await db.Song.findByPk(songId);

  await songToDelete.destroy();

  return res.json({ message: "Successfully Deleted." });
});

module.exports = router;
