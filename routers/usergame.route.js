const router = require("express").Router();
const userGameController = require("../controllers/userGameController");
const userGameViews = require("../controllers/userGame_views");

//api
router.get("/", userGameController.readAll);
router.get("/:id", userGameController.readById);
router.post("/", userGameController.create);
router.put("/:id", userGameController.update);
router.delete("/:id", userGameController.delete);

// views
router.get("/view/user-games/", userGameViews.readAll);
router.get("/view/create-user-games/", userGameViews.createUserGameForm);
router.post("/view/create-user-games/", userGameViews.create);
router.get("/view/update-form-user-games/:id", userGameViews.readById);
router.post("/view/update-user-games/:id", userGameViews.update);
router.get("/view/delete-user-games/:id", userGameViews.delete);

module.exports = router;
