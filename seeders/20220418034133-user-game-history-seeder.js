"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_game_history",
      [
        {
          nama_game: "Dota 2",
          waktu_bermain: "2020-04-06 15:13:16",
          skor_game: "100",
          id_user: "1",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nama_game: "valorant",
          waktu_bermain: "2020-04-06 15:13:16",
          skor_game: "100",
          id_user: "1",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nama_game: "Mobile Legends",
          waktu_bermain: "2020-04-06 15:13:16",
          skor_game: "25",
          id_user: "2",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_game_history", null, {});
  },
};
