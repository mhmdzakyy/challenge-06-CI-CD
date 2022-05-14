const router = require("express").Router();
const userGameHistory = require("../controllers/userGameHistoryController");
const userGameHistoryViews = require("../controllers/userGameHistory_views");
// api
router.get("/", userGameHistory.readAll);
router.get("/:id", userGameHistory.readById);
router.post("/", userGameHistory.create);
router.put("/:id", userGameHistory.update);
router.delete("/:id", userGameHistory.delete);

// views
router.get("/view/user-games-history/", userGameHistoryViews.readAll);
router.get("/view/create-user-games-history/", userGameHistoryViews.createUserGameHistoryForm);
router.post("/view/create-user-games-history/", userGameHistoryViews.create);
router.get("/view/update-form-user-games-history/:id", userGameHistoryViews.readById);
router.post("/view/update-user-games-history/:id", userGameHistoryViews.update);
router.get("/view/delete-user-games-history/:id", userGameHistoryViews.delete);

module.exports = router;
