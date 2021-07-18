const fs = require("fs");
const path = require("path");

class UserConfig {
  static users = [];
  static initUsers() {
    if (this.users && this.users.length === 0) {
      const rawData = fs.readFileSync(
        `${path.resolve(process.env.ROOT_PATH, `../`, "user.config.json")}`
      );
      const rawDeployers = JSON.parse(rawData);
      this.users = JSON.parse(JSON.stringify(rawDeployers));
    }
  }
  static getUsers() {
    if (this.users && this.users.length === 0) {
      initUsers();
    }
    return this.users;
  }
}

module.exports = UserConfig;
