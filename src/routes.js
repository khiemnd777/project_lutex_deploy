const express = require("express");
const deployController = require("./controllers/deploy-controller");
const authController = require("./controllers/auth-controller");
const router = express.Router();

let routes = (app) => {
  router.get("/", deployController.index);
  router.get("/login", authController.index);
  router.get("/logout", authController.logout);
  router.post("/auth/login", authController.login);
  router.post("/auth/me", authController.me);
  router.post("/deploy", deployController.deploy);
  router.get("/listen-deploying", deployController.listenDeploying);
  return app.use("/", router);
};

module.exports = routes;
