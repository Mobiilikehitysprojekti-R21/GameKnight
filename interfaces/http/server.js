// interfaces/http/server.js
const express = require("express");
const userRoutes = require("./routes/users");

module.exports = function createHttpServer(deps) {
  const app = express();
  app.use(express.json());

  app.use("/users", userRoutes(deps));

  return app;
};
