const { UserGame } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  readAll: (req, res) => {
    UserGame.findAll({
      attributes: ["id", "username", "password", "createdAt", "updatedAt"],
    })
      .then((user_game) => {
        if (user_game.length > 0) {
          res.status(200).json({ message: "Success", data: user_game });
        } else {
          res.status(404).json({ message: "User Game Tidak Tidak Ditemukan", data: user_game });
        }
      })
      .catch((err) => {
        res.status(422).json({ message: "Error", err });
      });
  },
  readById: (req, res) => {
    UserGame.findOne({
      where: { id: req.params.id },
      attributes: ["id", "username", "password", "createdAt", "updatedAt"],
    })
      .then((user_game) => {
        if (user_game) {
          res.status(200).json({ message: "Success", data: user_game });
        } else {
          res.status(404).json({ message: "User Game dengan ID " + req.params.id + " Tidak ditemukan", data: user_game });
        }
      })
      .catch((err) => {
        res.status(422).json({ message: "Error", err });
      });
  },

  create: async (req, res) => {
    try {
      const { username, password } = req.body;
      // negative test
      if (password.length < 8) {
        res.status(406).json({
          message: "Password must be at least 8 characters long",
        });
      }
      const exists = await UserGame.findOne({
        where: { username: username },
      });
      if (exists) {
        res.status(406).json({
          message: "Username already exists",
        });
      }
      if (username.typeOf() !== "string") {
        res.status(406).json({
          message: "Username must be a string",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserGame.create({
        username,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
        expiresIn: "15m",
      });
      user.token = token;

      res.status(200).json({ message: "Berhasil Membuat User Game" });
    } catch (error) {
      res.status(500).json({ message: "Gagal Create User Game", err: error.message });
    }
  },
  update: (req, res) => {
    const { username, password } = req.body;
    UserGame.update({ username, password }, { where: { id: req.params.id } })
      .then((user_game) => {
        res.status(200).json({ message: "User Game Updated", data: user_game });
      })
      .catch((err) => {
        res.status(422).json({ message: "Error updating user game", err });
      });
  },
  delete: (req, res) => {
    UserGame.destroy({ where: { id: req.params.id } })
      .then((user_game) => {
        if (user_game === 0) {
          res.status(404).json({
            message: "User Game dengan ID " + req.params.id + " Tidak ditemukan",
          });
        } else {
          res.status(200).json({ message: "User Game Deleted", data: user_game });
        }
      })
      .catch((err) => {
        res.status(422).json({ message: "Error deleting user game", err });
      });
  },
};
