/** @format */

const { UserGame } = require("../models");
const moment = require("moment");
const bcrypt = require("bcrypt");

module.exports = {
  readAll: (req, res) => {
    UserGame.findAll({
      attributes: ["id", "username", "password", "created_at", "updated_at"],
    })
      .then((result) => {
        if (result.length > 0) {
          res.render("index_usergame", { usergames: result, moment });
        } else {
          res.render("index_usergame", { usergames: result, moment });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
        // res.render("error", { status: res.status(500), err: err.message });
      });
  },
  readById: (req, res) => {
    UserGame.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "username", "password", "created_at", "updated_at"],
    })
      .then((result) => {
        if (result) {
          res.render("update_usergame", { usergame: result });
        } else {
          res.render("error", { status: res.status(404), err: "Data tidak ditemukan!" });
        }
      })
      .catch((err) => {
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  createUserGameForm: (req, res) => {
    res.render("add_usergame", { page_name: "usergames" });
  },
  create: async (req, res) => {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
    UserGame.create({
      username: req.body.username,
      password: hashedPassword,
    })
      .then((result) => {
        res.redirect("/view/user-games");
      })
      .catch((err) => {
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  update: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    UserGame.update(
      {
        username: username,
        password: hashedPassword,
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
          res.redirect("/view/user-games");
        }
      })
      .catch((err) => {
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  delete: (req, res) => {
    UserGame.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        if (result === 0) {
          res.render("error", { status: res.status(404), err: "Data tidak ditemukan!" });
        } else {
          res.redirect("/view/user-games");
        }
      })
      .catch((err) => {
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
};
