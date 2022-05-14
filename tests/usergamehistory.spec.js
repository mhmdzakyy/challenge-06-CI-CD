const { UserGameHistory, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
require("../controllers/userGameHistoryController");
const request = require("supertest");
const app = require("../app");

describe("User Game History API Testing", () => {
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
  test("Test /api/get-user-history no auth ", async () => {
    const { statusCode, error } = await request(app).get("/api/get-user-history");
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("Test /api/get-user-history/:id Get One User Game History with unknown ID & Failed", async () => {
    const { body, statusCode } = await request(app).get("/api/get-user-history/500").set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual("User Game History dengan ID 500 Tidak ditemukan");
  });

  test("Test Delete User Game History with unknown ID & Failed", async () => {
    const { body, statusCode } = await request(app).delete("/api/get-user-history/500").set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual("User Game History dengan ID 500 Tidak ditemukan");
  });

  // positive test
  test("Test /api/get-user-history to Get All User Games with Auth", async () => {
    const inputUserHistory = await UserGameHistory.create({ nama_game: "valorant", waktu_bermain: "01:00:00", skor_game: 8, id_user: 1 });
    const { body, statusCode } = await request(app).get("/api/get-user-history").set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Success");
    expect(body.data[body.data.length - 1].nama_game).toEqual(inputUserHistory.nama_game);
    expect(body.data[body.data.length - 1].waktu_bermain).toEqual(inputUserHistory.waktu_bermain);
    expect(body.data[body.data.length - 1].skor_game).toEqual(inputUserHistory.skor_game);
    expect(body.data[body.data.length - 1].id_user).toEqual(inputUserHistory.id_user);
    expect(body.data).toHaveLength(1);
  });

  test("Test /api/get-user-history/:id Get One User Game History & Success", async () => {
    const { body, statusCode } = await request(app).get("/api/get-user-history/1").set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.data.nama_game).toEqual("valorant");
    expect(body.data.waktu_bermain).toEqual("01:00:00");
    expect(body.data.skor_game).toEqual(8);
    expect(body.data.id_user).toEqual(1);
  });
});
