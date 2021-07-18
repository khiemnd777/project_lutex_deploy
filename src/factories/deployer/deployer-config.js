const fs = require("fs");
const path = require("path");

class DeployerConfig {
  static deployers = {};
  static initDeployers() {
    if (this.deployers && Object.keys(this.deployers).length === 0) {
      const rawData = fs.readFileSync(
        `${path.resolve(process.env.ROOT_PATH, `../`, "deploy.config.json")}`
      );
      const rawDeployers = JSON.parse(rawData);
      for (let name in rawDeployers) {
        rawDeployers[name]["deploying"] = false;
      }
      this.deployers = JSON.parse(JSON.stringify(rawDeployers));
    }
  }
  static getDeployers() {
    if (this.deployers && Object.keys(this.deployers).length === 0) {
      initDeployers();
    }
    return this.deployers;
  }
}

module.exports = DeployerConfig;
