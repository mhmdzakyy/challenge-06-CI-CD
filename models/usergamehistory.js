"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.UserGame, { foreignKey: "id_user", as: "userGame" });
    }
  }
  UserGameHistory.init(
    {
      nama_game: DataTypes.STRING,
      waktu_bermain: DataTypes.TIME,
      skor_game: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "user_game_history",
      modelName: "UserGameHistory",
      underscored: true,
    }
  );
  return UserGameHistory;
};
