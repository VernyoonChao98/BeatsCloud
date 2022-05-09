"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Songs",
      [
        {
          title: "Dancin",
          userId: 4,
          albumId: null,
          songUrl:
            "https://beatscloudclone.s3.us-west-1.amazonaws.com/Aaron+Smith+-+Dancin+(KRONO+Remix).mp4",
        },
        {
          title: "Gerudo Valley",
          userId: 4,
          albumId: null,
          songUrl:
            "https://beatscloudclone.s3.us-west-1.amazonaws.com/Gerudo+Valley+-+The+Legend+of+Zelda+Ocarina+Of+Time.mp4",
        },
        {
          title: "Boulevard Of Broken Dreams",
          userId: 4,
          albumId: null,
          songUrl:
            "https://beatscloudclone.s3.us-west-1.amazonaws.com/Green+Day+-+Boulevard+Of+Broken+Dreams+%5BOfficial+Music+Video%5D.mp4",
        },
        {
          title: "Good Things Fall Apart",
          userId: 4,
          albumId: null,
          songUrl:
            "https://beatscloudclone.s3.us-west-1.amazonaws.com/ILLENIUM%2C+Jon+Bellion+-+Good+Things+Fall+Apart+(Lyric+Video).mp4",
        },
        {
          title: "Don't Stop Believin",
          userId: 4,
          albumId: null,
          songUrl:
            "https://beatscloudclone.s3.us-west-1.amazonaws.com/Journey+-+Don't+Stop+Believin'+(Official+Audio).mp4",
        },
        {
          title: "Ornament",
          userId: 4,
          albumId: null,
          songUrl:
            "https://beatscloudclone.s3.us-west-1.amazonaws.com/Kiah+Victoria+-+Ornament.mp4",
        },
        {
          title: "Promiscuous",
          userId: 4,
          albumId: null,
          songUrl:
            "https://beatscloudclone.s3.us-west-1.amazonaws.com/Nelly+Furtado+-+Promiscuous+(Official+Music+Video)+ft.+Timbaland.mp4",
        },
        {
          title: "Mii Channel Theme Remix",
          userId: 4,
          albumId: null,
          songUrl:
            "https://beatscloudclone.s3.us-west-1.amazonaws.com/Nintendo+Wii+-+Mii+Channel+Theme+-+Jazz+Cover+insaneintherainmusic+(feat.+Gabe+N.+%26+Chris+A.).mp4",
        },
        {
          title: "Bohemian Rhapsody",
          userId: 4,
          albumId: null,
          songUrl:
            "https://beatscloudclone.s3.us-west-1.amazonaws.com/Queen+%E2%80%93+Bohemian+Rhapsody+(Official+Video+Remastered).mp4",
        },
        {
          title: "N G G Y U",
          userId: 4,
          albumId: null,
          songUrl:
            "https://beatscloudclone.s3.us-west-1.amazonaws.com/Rick+Astley+-+Never+Gonna+Give+You+Up+(Official+Music+Video).mp4",
        },
        {
          title: "Apologize",
          userId: 4,
          albumId: null,
          songUrl:
            "https://beatscloudclone.s3.us-west-1.amazonaws.com/Timbaland+-+Apologize+ft.+OneRepublic.mp4",
        },
        {
          title: "Thunder",
          userId: 4,
          albumId: null,
          songUrl:
            "https://beatscloudclone.s3.us-west-1.amazonaws.com/Wild+Cub+-+Thunder+Clatter+lyrics+on+screen.mp4",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Songs", null, {});
  },
};
