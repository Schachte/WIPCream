yaml = require("node-yaml");
fs = require("fs");

class DataUtil {
  readConfigFile() {
    return yaml.readSync("../data/settings.yml");
  }
  getConfig(key) {
    return this.readConfigFile()[key];
  }

  async writeConfig(key, val) {
    let fileData = await this.readConfigFile();
    fileData[key] = val;
    await yaml.write("../data/settings.yml", fileData);
    return fileData;
  }

  resetConfig() {
    let parsedSettings = yaml.readSync("../data/settings.example.yml");
    yaml.write("../data/settings.yml", parsedSettings);
  }
}

module.exports = DataUtil;
