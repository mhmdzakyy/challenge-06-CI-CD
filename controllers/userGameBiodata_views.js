/** @format */

const { UserGameBiodata } = require("../models");
const moment = require("moment");

module.exports = {
  readAll: (req, res) => {
    UserGameBiodata.findAll({
      attributes: ["id", "nama_user", "jenis_kelamin", "umur", "email", "id_user", "created_at", "updated_at"],
    })
      .then((result) => {
        if (result.length > 0) {
          res.render("index_usergamebiodata", { usergamesbiodata: result, moment });
        } else {
          res.render("index_usergamebiodata", { usergamesbiodata: result, moment });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
        // res.render("error", { status: res.status(500), err: err.message });
      });
  },
  readById: (req, res) => {
    UserGameBiodata.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "nama_user", "jenis_kelamin", "umur", "email", "id_user", "created_at", "updated_at"],
    })
      .then((result) => {
        if (result) {
          res.render("update_usergamebiodata", { usergamebiodata: result });
        } else {
          res.render("error", { status: res.status(404), err: "Data tidak ditemukan!" });
        }
      })
      .catch((err) => {
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  createUserGameBiodataForm: (req, res) => {
    res.render("add_usergamebiodata", { page_name: "usergamesbiodata" });
  },
  create: async (req, res) => {
    UserGameBiodata.create({
      nama_user: req.body.nama_user,
      jenis_kelamin: req.body.jenis_kelamin,
      umur: req.body.umur,
      email: req.body.email,
      id_user: req.body.id_user,
    })
      .then((result) => {
        res.redirect("/view/user-games-biodata");
      })
      .catch((err) => {
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  update: async (req, res) => {
    const { nama_user, jenis_kelamin, umur, email, id_user } = req.body;

    UserGameBiodata.update(
      {
        nama_user: nama_user,
        jenis_kelamin: jenis_kelamin,
        umur: umur,
        email: email,
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
          res.redirect("/view/user-games-biodata");
        }
      })
      .catch((err) => {
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  delete: (req, res) => {
    UserGameBiodata.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        if (result === 0) {
          res.render("error", { status: res.status(404), err: "Data tidak ditemukan!" });
        } else {
          res.redirect("/view/user-games-biodata");
        }
      })
      .catch((err) => {
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
};
