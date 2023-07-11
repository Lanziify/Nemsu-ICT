const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/validateTokenHandler");
const {
  createUser,
  createRequest,
  getAllRequest,
  getUserRequests,
  respondUserRequest,
  setAdmin,
} = require("../controller/UserController");

router.route("/create").post(createUser);
router.route("/request").post(authMiddleware, createRequest);
// router.route("/login").post(loginUser);
// router.route("/logout").post(logoutUser);
router.route("/requests").get(getAllRequest);
router.route("/:id").post(authMiddleware, setAdmin);
router.route("/:id").get(getUserRequests);
router.route("/:id").put(respondUserRequest);

module.exports = router;
