const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const DataUtil = require("../lib/dataUtil");
const dataUtil = new DataUtil();
const cors = require('cors')

const port = 1337;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// Routes
app.get("/config", (req, res) => res.send(dataUtil.readConfigFile()));

app.post("/config", async (req, res) => {
  let limit = req.body["pull_request_limit"];
  let commentReply = req.body["comment_reply"];
  let presetExemption = req.body["preset_exemption"];

  if (limit) {
    await dataUtil.writeConfig("pull_request_limit", limit);
  }

  if (commentReply) {
    await dataUtil.writeConfig("comment_reply", commentReply);
  }

  if (presetExemption) {
    await dataUtil.writeConfig("preset_exemption", presetExemption);
  }
  res.send(dataUtil.readConfigFile());
});

// // HTTP
app.listen(port, () => console.log(`WIPCream listening on port ${port}!`));
