"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.UserGameBiodata, { foreignKey: "id", as: "userGameBiodata" });
      this.hasMany(models.UserGameHistory, { foreignKey: "id", as: "userGameHistory" });
    }
  }
  UserGame.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "user_games",
      modelName: "UserGame",
      underscored: true,
    }
  );
  return UserGame;
};
