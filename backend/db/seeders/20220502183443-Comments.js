"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          context: "This is a great Song",
          userId: 1,
          songId: 1,
        },
        {
          context: "FIRE!!!!!!!",
          userId: 2,
          songId: 1,
        },
        {
          context: "GET OUTA HERE",
          userId: 3,
          songId: 1,
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
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
