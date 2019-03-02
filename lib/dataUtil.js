yaml = require("node-yaml");
fs = require("fs");

class DataUtil {
  constructor() {
    this.configFile = this.readConfigFile();
  }

  readConfigFile() {
    return yaml.readSync("../data/settings.yml");
  }
  getConfig(key) {
    return this.configFile[key];
  }

  writeConfig(key, val) {
    let fileData = this.configFile();
    fileData[key] = val;
    return fileData;
  }

  resetConfig() {
    let parsedSettings = yaml.readSync("../data/settings.example.yml");
    yaml.write("../data/settings.yml", parsedSettings);
  }
}

module.exports = DataUtil;
