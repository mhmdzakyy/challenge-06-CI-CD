const { UserGameBiodata, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
require("../controllers/userGameBiodataController");
const request = require("supertest");
const app = require("../app");

describe("User Game Biodata API Testing", () => {
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
  test("Test /api/get-user-biodata no auth ", async () => {
    const { statusCode, error } = await request(app).get("/api/get-user-biodata");
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("Test /api/get-user-biodata/:id Get One User Game Biodata with unknown ID & Failed", async () => {
    const { body, statusCode } = await request(app).get("/api/get-user-biodata/500").set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual("User Game Biodata dengan ID 500 Tidak ditemukan");
  });

  test("Test Delete User Game Biodata with unknown ID & Failed", async () => {
    const { body, statusCode } = await request(app).delete("/api/get-user-biodata/500").set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual("User Game Biodata dengan ID 500 Tidak ditemukan");
  });

  // positive test
  test("Test /api/get-user-biodata to Get All User Games with Auth", async () => {
    const inputUserBiodata = await UserGameBiodata.create({ nama_user: "admin", jenis_kelamin: "laki-laki", umur: 20, email: "admin@admin.com", id_user: 1 });
    const { body, statusCode } = await request(app).get("/api/get-user-biodata").set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Success");
    expect(body.data[body.data.length - 1].nama_user).toEqual(inputUserBiodata.nama_user);
    expect(body.data[body.data.length - 1].jenis_kelamin).toEqual(inputUserBiodata.jenis_kelamin);
    expect(body.data[body.data.length - 1].umur).toEqual(inputUserBiodata.umur);
    expect(body.data[body.data.length - 1].email).toEqual(inputUserBiodata.email);
    expect(body.data[body.data.length - 1].id_user).toEqual(inputUserBiodata.id_user);
    expect(body.data).toHaveLength(1);
  });

  test("Test /api/get-user-biodata/:id Get One User Game Biodata & Success", async () => {
    const { body, statusCode } = await request(app).get("/api/get-user-biodata/1").set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.data.nama_user).toEqual("admin");
    expect(body.data.jenis_kelamin).toEqual("laki-laki");
    expect(body.data.umur).toEqual(20);
    expect(body.data.email).toEqual("admin@admin.com");
    expect(body.data.id_user).toEqual(1);
  });
});
