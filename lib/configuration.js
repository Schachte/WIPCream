const DataUtil = require("./dataUtil");

class Configuration {
  static async retrieveReply() {
    return this.dataUtil.getConfig("comment_reply");
  }

  static async retrieveMaxWip() {
    return this.dataUtil.getConfig("pull_request_limit");
  }

  static async getPrs(ctx) {
    return await ctx.github.pullRequests.list({
      owner: ctx.repo()["owner"],
      repo: ctx.repo()["repo"]
    });
  }
}

Configuration.dataUtil = new DataUtil();
module.exports = Configuration;
