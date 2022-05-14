const express = require("express");
const app = express();
const router = require("./routers");
const swaggerJSON = require("./swagger.json");
const swaggerUI = require("swagger-ui-express");
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.set("view engine", "ejs"); // set ejs
app.use(express.static("public"));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.use(router);

app.get("/", (req, res) => {
  res.render("index");
});

module.exports = app;
