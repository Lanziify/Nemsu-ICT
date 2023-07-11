const userModel = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  // Create User
  const { email, password } = req.body;
  // Check email and password and returns invalid when fields are empty
  if ((!email, !password)) {
    res.status(400);
    throw new Error("Fields should not be empty!");
  }
  await userModel.createUser(email, password);
  res.status(200);
});

const createRequest = asyncHandler(async (req, res) => {
  const { data } = req.body;
  const request = await userModel.createRequest({ data });
  res.status(200).json({ request });
});

const getAllRequest = asyncHandler(async (req, res) => {
  const request = await userModel.getAllRequest();
  res.status(200).json({ request });
});

const getUserRequests = asyncHandler(async (req, res) => {
  const uid = req.params.id;
  const request = await userModel.getUserRequests(uid);
  res.status(200).json({ request });
});

const respondUserRequest = asyncHandler(async (req, res) => {
  const requesId = req.params.id;
  const request = await userModel.respondUserRequest(requesId);
  res.status(200).json({ request });
});

const setAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params.requestId;
  if (!uid) {
    res.status(400).json({ message: "Invalid!" });
  }

  const { admin } = await userModel.setAdmin(uid);

  res.status(200).json({ admin });
});

module.exports = {
  createUser,
  createRequest,
  getAllRequest,
  getUserRequests,
  respondUserRequest,
  setAdmin,
};
