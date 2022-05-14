"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.UserGame, { foreignKey: "id_user", as: "userGame" });
    }
  }
  UserGameBiodata.init(
    {
      nama_user: DataTypes.STRING,
      jenis_kelamin: DataTypes.STRING,
      umur: DataTypes.INTEGER,
      email: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "user_game_biodata",
      modelName: "UserGameBiodata",
      underscored: true,
    }
  );
  return UserGameBiodata;
};
