const RequestHandler = require("./lib/requestHandler");

const eventSubscriptions = ["pull_request.opened", "pull_request.reopened"];

module.exports = app => {
  app.log.info("WIPCream has been initialized");
  app.on(eventSubscriptions, async ctx => {
    RequestHandler.handleReq(ctx);
  });
};
