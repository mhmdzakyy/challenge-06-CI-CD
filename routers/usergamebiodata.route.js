const router = require("express").Router();
const userGameBiodataController = require("../controllers/userGameBiodataController");
const userGameBiodataViews = require("../controllers/userGameBiodata_views");
// api
router.get("/", userGameBiodataController.readAll);
router.get("/:id", userGameBiodataController.readById);
router.post("/", userGameBiodataController.create);
router.put("/:id", userGameBiodataController.update);
router.delete("/:id", userGameBiodataController.delete);

// views
router.get("/view/user-games-biodata/", userGameBiodataViews.readAll);
router.get("/view/create-user-games-biodata/", userGameBiodataViews.createUserGameBiodataForm);
router.post("/view/create-user-games-biodata/", userGameBiodataViews.create);
router.get("/view/update-form-user-games-biodata/:id", userGameBiodataViews.readById);
router.post("/view/update-user-games-biodata/:id", userGameBiodataViews.update);
router.get("/view/delete-user-games-biodata/:id", userGameBiodataViews.delete);

module.exports = router;
