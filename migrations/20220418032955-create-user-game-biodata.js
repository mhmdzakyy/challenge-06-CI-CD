"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_game_biodata", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_user: {
        type: Sequelize.STRING,
      },
      jenis_kelamin: {
        type: Sequelize.STRING,
      },
      umur: {
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "user_games",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_game_biodata");
  },
};
