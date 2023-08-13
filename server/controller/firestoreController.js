// const express = require("express");
const firestoreModel = require("../model/firestoreModel");
const asyncHandler = require("express-async-handler");

// Create User
const createUser = asyncHandler(async (req, res) => {
  const { data } = req.body;
  try {
    const register = await firestoreModel.createUser({ data });
    res.status(200).json({ register });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await firestoreModel.getAllUsers();
  res.status(200).json({ users });
});

const setAdmin = asyncHandler(async (req, res) => {
  const uid = req.params.id;
  const admin = await firestoreModel.setAdmin(uid);
  res.status(200).json({ admin });
});

const createRequest = asyncHandler(async (req, res) => {
  const { data } = req.body;
  try {
    const request = await firestoreModel.createRequest({ data });
    res.status(200).json({ request });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const respondUserRequest = asyncHandler(async (req, res) => {
  const { status, data } = req.body;
  try {
    const requestId = req.params.id;
    const request = await firestoreModel.respondUserRequest(
      requestId,
      status,
      data
    );

    res.status(200).json({ request });
  } catch (error) {
    console.log(error);
  }
});

const getUserRequests = asyncHandler(async (req, res) => {
  const uid = req.params.id;
  const request = await firestoreModel.getUserRequests(uid);
  res.status(200).json({ request });
});

const getAllRequest = asyncHandler(async (req, res) => {
  const request = await firestoreModel.getAllRequest();
  res.status(200).json({ request });
});

const getRequestNotification = asyncHandler(async (req, res) => {
  const notification = await firestoreModel.getRequestNotification();
  res.status(200).json({ notification });
});

const getRequisitionResponseNotification = asyncHandler(async (req, res) => {
  const uid = req.params.id;
  const notification = await firestoreModel.getRequisitionResponseNotification(
    uid
  );
  res.status(200).json({ notification });
});

const updateFcmToken = asyncHandler(async (req, res) => {
  const { uid, fcmToken } = req.body;
  const fcm = await firestoreModel.updateFcmToken(uid, fcmToken);
  res.status(200).json({ fcm });
});

const readNotification = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;
  const notification = await firestoreModel.readNotification(notificationId);
  res.status(200).json({ notification });
});

module.exports = {
  createUser,
  getAllUsers,
  setAdmin,
  createRequest,
  respondUserRequest,
  getUserRequests,
  getAllRequest,
  getRequestNotification,
  getRequisitionResponseNotification,
  updateFcmToken,
  readNotification
};
