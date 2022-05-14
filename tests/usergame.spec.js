const { UserGame, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
require("../controllers/userGameController");
const request = require("supertest");
const app = require("../app");

describe("User Game API Testing", () => {
  beforeAll(async () => {
    await request(app).post("/api/register").send({ username: "zaky", password: "zaky" });
    const login = await request(app).post("/api/login").send({ username: "zaky", password: "zaky" });
    token = login.body.token;
  });
  afterAll(async () => {
    try {
      await sequelize.query("TRUNCATE user_games, user_game_biodata, user_game_history RESTART IDENTITY;", { type: QueryTypes.RAW });
    } catch (error) {
      console.log(error);
    }
  });

  // negative test
  test("Test /api/get-user-games no auth", async () => {
    const { statusCode, error } = await request(app).get("/api/get-user-games");
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("Test /api/get-user-games/:id One User Game with unknown ID & Failed", async () => {
    const { body, statusCode } = await request(app).get("/api/get-user-games/500").set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual("User Game dengan ID 500 Tidak ditemukan");
  });

  test("Test Delete User Game with unknown ID & Failed", async () => {
    const { body, statusCode } = await request(app).delete("/api/get-user-games/500").set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual("User Game dengan ID 500 Tidak ditemukan");
  });

  // positive test
  test("Test /api/get-user-game to Get All User Games with Auth", async () => {
    const inputUserGames = await UserGame.create({ username: "admin", password: "admin" });
    const { body, statusCode } = await request(app).get("/api/get-user-games").set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Success");
    expect(body.data[body.data.length - 1].username).toEqual(inputUserGames.username);
    expect(body.data[body.data.length - 1].password).toEqual(inputUserGames.password);
    expect(body.data).toHaveLength(2);
  });

  test("Test /api/get-user-games/:id Get One User Game & Success", async () => {
    const { body, statusCode } = await request(app).get("/api/get-user-games/2").set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.data.username).toEqual("admin");
    expect(body.data.password).toEqual("admin");
  });
});
