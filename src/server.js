const path = require("path");
const express = require("express");
const app = express();
const initRoutes = require("./routes");
const bodyParser = require("body-parser");
const multer = require("multer");
const DeployerConfig = require("./factories/deployer/deployer-config");
const UserConfig = require("./factories/auth/user-config");

// Init root path
process.env.ROOT_PATH = path.resolve(__dirname);
console.log(process.env.ROOT_PATH);

// Init deployers
DeployerConfig.initDeployers();
// Init users
UserConfig.initUsers();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../src", "wwwroot")));
// for parsing multipart/form-data
const upload = multer();
app.use(upload.array());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const port = 7000;
app.listen(port, () => {
  console.log(`Running at ${port}`);
});
