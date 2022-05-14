/** @format */

const { UserGame } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    // Our register logic starts here
    try {
      // Get user input
      const { username, password } = req.body;

      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      const user = await UserGame.create({
        username,
        password: encryptedPassword,
      });

      // Create token
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
        expiresIn: "15m",
      });
      // save user token
      user.token = token;

      // return new user
      res.status(200).json({ message: "Berhasil Membuat User Game", result: user });
    } catch (err) {
      res.status(500).json({ message: "Gagal Create User Game", err: err.message });
    }
    // Our register logic ends here
  },
  login: async (req, res) => {
    // Our login logic starts here
    try {
      // Get user input
      const { username, password } = req.body;

      // Validate user input
      if (!(username && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await UserGame.findOne({
        where: {
          username: username,
        },
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign({ id: user.id, username }, process.env.TOKEN_KEY, {
          expiresIn: "15m",
        });

        // save user token
        user.token = token;

        // user
        res.status(200).json(user);
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  },
};

// INSERT INTO "user_games" ("id","username","password",disini tokennya ga anggep wkwk"created_at","updated_at") VALUES (DEFAULT,$1,$2,$3,$4) RETURNING "id","username","password","token","created_at","updated_at";
