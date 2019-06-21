const Configuration = require("./configuration");
const Teams = require("../data/teams");

class RequestHandler {
  static async handleReq(ctx) {
    this.ctx = ctx;
    const currentTeamCounts = await this.getCurrentTeamCounts(ctx);
    const currentUser = ctx.payload.pull_request.user.login.toLowerCase();
    const currentUserTeam = this.getTeamForUser(currentUser);

    console.log(currentTeamCounts);
    console.log(currentUser);
    console.log(currentUserTeam);

    if (
      currentUserTeam !== undefined &&
      Teams.getTeams()["teams"][currentUserTeam].limit <
        currentTeamCounts[currentUserTeam]
    ) {
      console.log("Limit exceeded!");
      await this.closeAndComment();
    }
  }

  static async getPrCount() {
    const pullRequests = await Configuration.getPrs(this.ctx);
    this.ctx.log(pullRequests.data.length);
    return pullRequests.data.length;
  }

  static async closeAndComment() {
    // Things to ignore
    const presetExemptions = await Configuration.retrievePresetList();
    const prTitle = this.ctx.payload.pull_request.title;
    const labels = this.ctx.payload.pull_request.labels.map(
      label => label.name
    );

    const foundExemption = presetExemptions.some(r => labels.indexOf(r) >= 0);
    const exemptTitle = presetExemptions.some(r => prTitle.startsWith(r));

    if (!exemptTitle && !foundExemption) {
      await this.generatePRReply();
      await this.closePullRequest();
    }
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

  static async getCurrentTeamCounts(ctx) {
    let currentTeamCounts = {};
    const currentOpenPrs = await Configuration.getPrs(ctx);

    for (let i = 0; i < currentOpenPrs.data.length; i++) {
      const currentPrOwner = currentOpenPrs.data[i].user.login.toLowerCase();
      const currentOwnerTeam = this.getTeamForUser(currentPrOwner);
      if (currentOwnerTeam in currentTeamCounts) {
        currentTeamCounts[currentOwnerTeam] += 1;
      } else {
        currentTeamCounts[currentOwnerTeam] = 1;
      }
    }
    return currentTeamCounts;
  }

  static getTeamForUser(user) {
    const teamsData = Teams.getTeams()["teams"];
    const keys = Object.keys(teamsData);

    for (const key of keys) {
      if (teamsData[key].members.indexOf(user) > -1) {
        return key;
      }
    }
    return undefined;
  }
}

module.exports = RequestHandler;
