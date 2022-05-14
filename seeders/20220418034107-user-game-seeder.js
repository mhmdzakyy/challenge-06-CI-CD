"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_games",
      [
        {
          username: "admin",
          password: "admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "user1",
          password: "user1",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "user2",
          password: "user2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "user3",
          password: "user3",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "user4",
          password: "user4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "user5",
          password: "user5",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_games", null, {});
  },
};
