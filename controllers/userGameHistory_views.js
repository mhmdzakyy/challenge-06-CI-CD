/** @format */

const { UserGameHistory } = require("../models");
const moment = require("moment");
const bcrypt = require("bcrypt");

module.exports = {
  readAll: (req, res) => {
    UserGameHistory.findAll({
      attributes: ["id", "nama_game", "waktu_bermain", "skor_game", "id_user", "created_at", "updated_at"],
    })
      .then((result) => {
        if (result.length > 0) {
          res.render("index_usergamehistory", { usergameshistory: result, moment });
        } else {
          res.render("index_usergamehistory", { usergameshistory: result, moment });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
        // res.render("error", { status: res.status(500), err: err.message });
      });
  },
  readById: (req, res) => {
    UserGameHistory.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "nama_game", "waktu_bermain", "skor_game", "id_user", "created_at", "updated_at"],
    })
      .then((result) => {
        if (result) {
          res.render("update_usergamehistory", { usergamehistory: result });
        } else {
          res.render("error", { status: res.status(404), err: "Data tidak ditemukan!" });
        }
      })
      .catch((err) => {
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  createUserGameHistoryForm: (req, res) => {
    res.render("add_usergamehistory", { page_name: "usergamesistory" });
  },
  create: async (req, res) => {
    UserGameHistory.create({
      nama_game: req.body.nama_game,
      waktu_bermain: req.body.waktu_bermain,
      skor_game: req.body.skor_game,
      id_user: req.body.id_user,
    })
      .then((result) => {
        res.redirect("/view/user-games-history");
      })
      .catch((err) => {
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  update: async (req, res) => {
    const { nama_game, waktu_bermain, skor_game, id_user } = req.body;

    UserGameHistory.update(
      {
        nama_game: nama_game,
        waktu_bermain: waktu_bermain,
        skor_game: skor_game,
        id_user: id_user,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((result) => {
        if (result[0] === 0) {
          res.render("error", { status: res.status(404), err: "Data tidak ditemukan!" });
        } else {
          res.redirect("/view/user-games-history");
        }
      })
      .catch((err) => {
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  delete: (req, res) => {
    UserGameHistory.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        if (result === 0) {
          res.render("error", { status: res.status(404), err: "Data tidak ditemukan!" });
        } else {
          res.redirect("/view/user-games-history");
        }
      })
      .catch((err) => {
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
};
