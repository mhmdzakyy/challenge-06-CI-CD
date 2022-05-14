const router = require("express").Router();
const userGame = require("./usergame.route");
const userGameBiodata = require("./usergamebiodata.route");
const userGameHistory = require("./usergamehistory.route");
const auth = require("../middleware/auth");

const { register, login } = require("../controllers/auth");

// VIEW USER GAME
router.get("/view/user-games", userGame);
router.get("/view/create-user-games", userGame);
router.post("/view/create-user-games", userGame);
router.get("/view/update-form-user-games/:id", userGame);
router.post("/view/update-user-games/:id", userGame);
router.get("/view/delete-user-games/:id", userGame);

// VIEW USER GAME BIODATA
router.get("/view/user-games-biodata", userGameBiodata);
router.get("/view/create-user-games-biodata", userGameBiodata);
router.post("/view/create-user-games-biodata", userGameBiodata);
router.get("/view/update-form-user-games-biodata/:id", userGameBiodata);
router.post("/view/update-user-games-biodata/:id", userGameBiodata);
router.get("/view/delete-user-games-biodata/:id", userGameBiodata);

// VIEW USER GAME HISTORY
router.get("/view/user-games-history", userGameHistory);
router.get("/view/create-user-games-history", userGameHistory);
router.post("/view/create-user-games-history", userGameHistory);
router.get("/view/update-form-user-games-history/:id", userGameHistory);
router.post("/view/update-user-games-history/:id", userGameHistory);
router.get("/view/delete-user-games-history/:id", userGameHistory);

// user_games endppoint
router.use("/api/get-user-games", auth, userGame);
router.use("/api/get-user-games/:id", auth, userGame);
router.use("/api/create-user-games", auth, userGame);
router.use("/api/update-user-games", auth, userGame);
router.use("/api/delete-user-games", auth, userGame);

// user_game_biodata endppoint
router.use("/api/get-user-biodata", auth, userGameBiodata);
router.use("/api/get-user-biodata/:id", auth, userGameBiodata);
router.use("/api/create-user-biodata", auth, userGameBiodata);
router.use("/api/update-user-biodata", auth, userGameBiodata);
router.use("/api/delete-user-biodata", auth, userGameBiodata);

// user_game_history endppoint
router.use("/api/get-user-history", auth, userGameHistory);
router.use("/api/get-user-history/:id", auth, userGameHistory);
router.use("/api/create-user-history", auth, userGameHistory);
router.use("/api/update-user-history", auth, userGameHistory);
router.use("/api/delete-user-history", auth, userGameHistory);

router.post("/api/register", register);
router.post("/api/login", login);

module.exports = router;
