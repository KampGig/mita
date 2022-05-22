const userController = require("../controllers/users.ctrl");
const postController = require("../controllers/postroom.ctrl");
const express        = require('express');
const { route }      = require("express/lib/application");
const router         = express.Router();

router.post("/otpRequest", userController.sendCode);
router.post("/checkCode", userController.checkCode);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user-profile", userController.userProfile);
router.post("/createPost", postController.create);
router.post("/makeRequest", postController.makeRequest);
router.get("/roomiePosts", postController.getAll);
router.get("/postByUser/:userID", postController.getByuserID);
router.put("/updatePost/:id", postController.updatePost);
router.delete("/deletePost/:id", postController.deletePost);
router.post("/rentReqs", userController.rentHouse);

module.exports = router;