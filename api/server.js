const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const DataUtil = require("../lib/dataUtil");
const dataUtil = new DataUtil();
const cors = require("cors");
const axios = require("axios");
const url = require("url");

require("dotenv").config();

const envir = require("./environment");
const Environment = new envir();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 1337;

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

app.get("/login", async (req, res) => {
  // Get the identity token from GitHub origin
  return await axios
    .post("https://github.com/login/oauth/access_token", {
      code: req.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    })
    .then(async resp => {
      let data = await url.parse("http://parse.com?" + resp.data, {
        parseQueryString: true
      }).query;

      res.redirect(
        url.format({
          pathname: Environment.getUrl(),
          query: {
            token: data.access_token
          }
        })
      );
    });
});

// HTTP
app.listen(port, () => console.log(`WIPCream listening on port ${port}!`));
