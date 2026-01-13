const express = require("express");
const createUserController = require("../controllers/createUserController");

module.exports = function userRoutes({ createUser }) {
  const router = express.Router();

  router.post("/", createUserController(createUser));

  return router;
};
