class Environment {
  //TODO: Add production URL when swapping environments
  getUrl() {
    return process.env.ENVIRONMENT === "DEV" ? "http://localhost:3001" : "prod";
  }
}

module.exports = Environment;
