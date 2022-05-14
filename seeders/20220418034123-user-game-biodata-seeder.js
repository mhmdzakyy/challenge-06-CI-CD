"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_game_biodata",
      [
        {
          nama_user: "admin",
          jenis_kelamin: "Laki-laki",
          umur: "20",
          email: "admin@admin.com",
          id_user: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_game_biodata", null, {});
  },
};
