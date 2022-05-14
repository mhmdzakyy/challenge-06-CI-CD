const { UserGameHistory } = require("../models");

module.exports = {
  readAll: (req, res) => {
    UserGameHistory.findAll()
      .then((user_game_history) => {
        res.status(200).json({ message: "Success", data: user_game_history });
      })
      .catch((err) => {
        res.status(422).json({ message: "Error", err });
      });
  },
  readById: (req, res) => {
    UserGameHistory.findOne({
      where: { id: req.params.id },
    })
      .then((user_game_history) => {
        if (user_game_history) {
          res.status(200).json({ message: "Success", data: user_game_history });
        } else {
          res.status(404).json({ message: "User Game History dengan ID " + req.params.id + " Tidak ditemukan", data: user_game_history });
        }
      })
      .catch((err) => {
        res.status(422).json({ message: "Error", err });
      });
  },
  create: (req, res) => {
    UserGameHistory.create({
      nama_game: req.body.nama_game,
      waktu_bermain: req.body.waktu_bermain,
      skor_game: req.body.skor_game,
      id_user: req.body.id_user,
    })
      .then((user_game_history) => {
        res.status(200).json({ message: "Success", data: user_game_history });
      })
      .catch((err) => {
        res.status(422).json({ message: "Error creating user game", err });
      });
  },
  update: (req, res) => {
    const { nama_game, waktu_bermain, skor_game, id_user } = req.body;
    UserGameHistory.update({ nama_game, waktu_bermain, skor_game, id_user }, { where: { id: req.params.id } })
      .then((user_game_history) => {
        res.status(200).json({ message: "User Game History Updated", data: user_game_history });
      })
      .catch((err) => {
        res.status(422).json({ message: "Error updating user game", err });
      });
  },
  delete: (req, res) => {
    UserGameHistory.destroy({ where: { id: req.params.id } })
      .then((user_game_history) => {
        if (user_game_history) {
          res.status(200).json({ message: "User Game History Deleted", data: user_game_history });
        } else {
          res.status(404).json({
            message: "User Game History dengan ID " + req.params.id + " Tidak ditemukan",
          });
        }
      })
      .catch((err) => {
        res.status(422).json({ message: "Error deleting user game", err });
      });
  },
};
