const path = require("path");
const { verifyJwt, getJwtFromHeader } = require("../factories/auth/jwt");
const {
  deploy,
  listenDeploying,
} = require("../factories/deployer/the-deployer");

const model = "home";

module.exports = {
  index: (req, res) => {
    return res.sendFile(
      path.join(`${process.env.ROOT_PATH}/views/${model}`, "index.html")
    );
  },
  deploy: (req, res) => {
    return deploy(req, res);
  },
  listenDeploying: (req, res) => {
    return listenDeploying(req, res);
  },
};
