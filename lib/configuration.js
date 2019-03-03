const DataUtil = require("./dataUtil");

class Configuration {
  static async retrieveReply() {
    return this.dataUtil.getConfig("comment_reply");
  }

  static async retrieveMaxWip() {
    let limit = await this.dataUtil.getConfig("pull_request_limit");
    return limit instanceof String ? parseInt(limit) : limit;
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
