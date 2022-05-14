const { UserGameBiodata } = require("../models");

module.exports = {
  readAll: (req, res) => {
    UserGameBiodata.findAll()
      .then((user_game_biodata) => {
        res.status(200).json({ message: "Success", data: user_game_biodata });
      })
      .catch((err) => {
        res.status(422).json({ message: "Error", err });
      });
  },
  readById: (req, res) => {
    UserGameBiodata.findOne({
      where: { id: req.params.id },
    })
      .then((user_game_biodata) => {
        if (user_game_biodata) {
          res.status(200).json({ message: "Success", data: user_game_biodata });
        } else {
          res.status(404).json({ message: "User Game Biodata dengan ID " + req.params.id + " Tidak ditemukan", data: user_game_biodata });
        }
      })
      .catch((err) => {
        res.status(422).json({ message: "Error", err });
      });
  },
  create: (req, res) => {
    UserGameBiodata.create({
      nama_user: req.body.nama_user,
      jenis_kelamin: req.body.jenis_kelamin,
      umur: req.body.umur,
      email: req.body.email,
      id_user: req.body.id_user,
    })
      .then((user_game_biodata) => {
        res.status(200).json({ message: "Success", data: user_game_biodata });
      })
      .catch((err) => {
        res.status(422).json({ message: "Error creating user game", err });
      });
  },
  update: (req, res) => {
    const { nama_user, jenis_kelamin, umur, email, id_user } = req.body;
    UserGameBiodata.update({ nama_user, jenis_kelamin, umur, email, id_user }, { where: { id: req.params.id } })
      .then((user_game_biodata) => {
        res.status(200).json({ message: "User Game Biodata Updated", data: user_game_biodata });
      })
      .catch((err) => {
        res.status(422).json({ message: "Error updating user game", err });
      });
  },
  delete: (req, res) => {
    UserGameBiodata.destroy({ where: { id: req.params.id } })
      .then((user_game_biodata) => {
        if (user_game_biodata) {
          res.status(200).json({ message: "User Game Biodata Deleted", data: user_game_biodata });
        } else {
          res.status(404).json({
            message: "User Game Biodata dengan ID " + req.params.id + " Tidak ditemukan",
          });
        }
      })
      .catch((err) => {
        res.status(422).json({ message: "Error deleting user game", err });
      });
  },
};
