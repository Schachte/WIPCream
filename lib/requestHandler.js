const Configuration = require("./configuration");

class RequestHandler {
  static async handleReq(ctx) {
    this.ctx = ctx;
    const currentCount = await this.getPrCount();
    const configLimit = await Configuration.retrieveMaxWip();
    this.handleEvent(currentCount, configLimit);
  }

  static async getPrCount() {
    const pullRequests = await Configuration.getPrs(this.ctx);
    this.ctx.log(pullRequests.data.length);
    return pullRequests.data.length;
  }

  static async handleEvent(count, limit) {
    this.ctx.log("Comparing limits: " + { count, limit });
    count > limit ? this.closeAndComment() : undefined;
  }

  static async closeAndComment() {
    await this.generatePRReply();
    await this.closePullRequest();
  }

  static async generatePRReply() {
    this.ctx.github.issues.createComment({
      body: await Configuration.retrieveReply(),
      pullRequest: this.ctx.pullRequest,
      commit_id: this.ctx.payload.pull_request.head.sha,
      number: this.ctx.payload.pull_request.number,
      owner: this.ctx.repo()["owner"],
      repo: this.ctx.repo()["repo"]
    });
  }

  static async closePullRequest() {
    this.ctx.github.pullRequests.update({
      state: "closed",
      commit_id: this.ctx.payload.pull_request.head.sha,
      number: this.ctx.payload.pull_request.number,
      owner: this.ctx.repo()["owner"],
      repo: this.ctx.repo()["repo"]
    });
  }
}

module.exports = RequestHandler;
