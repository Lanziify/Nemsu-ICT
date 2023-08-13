const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/validateTokenHandler");
const {
  createUser,
  createRequest,
  getAllUsers,
  getAllRequest,
  getUserRequests,
  getRequestNotification,
  getRequisitionResponseNotification,
  updateFcmToken,
  respondUserRequest,
  setAdmin,
  readNotification,
} = require("../controller/firestoreController");

router.route("/register").post(authMiddleware, createUser);
router.route("/create").post(authMiddleware, createRequest);

router.route("/users").get(getAllUsers);
router.route("/requests").get(getAllRequest);
router.route("/request/:id").get(getUserRequests);
router.route("/notification/request").get(getRequestNotification);
router.route("/notification/:id").get(getRequisitionResponseNotification);

router.route("/admin/:id").put(setAdmin);
router.route("/fcm").put(updateFcmToken);
router.route("/request/:id").put(respondUserRequest);
router.route("/notification/:id").put(readNotification);

module.exports = router;
