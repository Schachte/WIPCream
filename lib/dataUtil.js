const fs = require("fs");
const yaml = require("node-yaml");

/**
 * We should invert the dependency here so we can make it easier to simulate writing to the filesystem
 */
class DataUtil {
  constructor(dataWriter) {
    if (!dataWriter) {
      this.dataWriter = yaml;
      this.dataWriter.getClassType = function() {
        return "node-yaml";
      };
    } else {
      this.dataWriter = dataWriter;
    }
  }

  readConfigFile() {
    return this.dataWriter.readSync("../data/settings.yml");
  }

  getConfig(key) {
    return this.readConfigFile()[key];
  }

  async writeConfig(key, val) {
    let fileData = await this.readConfigFile();
    fileData[key] = val;
    await this.dataWriter.write("../data/settings.yml", fileData);
    return fileData;
  }

  resetConfig() {
    let parsedSettings = this.dataWriter.readSync(
      "../data/settings.example.yml"
    );
    this.dataWriter.write("../data/settings.yml", parsedSettings);
  }
}

module.exports = DataUtil;
