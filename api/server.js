const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const DataUtil = require("../lib/dataUtil");
const yaml = require("node-yaml");
const dataUtil = new DataUtil(yaml);
const cors = require("cors");
const axios = require("axios");
const url = require("url");
const Configuration = require("../lib/configuration");

require("dotenv").config();

const envir = require("./environment");
const Environment = new envir();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 1337;

// Routes
app.get("/config", async (req, res) => {
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let verifiedStatus = await verifyToken(query.token);
  console.log(verifiedStatus);
  if (verifiedStatus == "success") {
    res.send(dataUtil.readConfigFile());
  }
  res.status(500);
});

app.post("/config", async (req, res) => {
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let verifiedStatus = await verifyToken(query.token);
  if (verifiedStatus == "success") {
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
  }
  res.status(500);
});

app.get("/login", async (req, res) => {
  let token = req.get("Authorization").split(/\s+/);

  return await axios
    .post("https://github.com/login/oauth/access_token", {
      code: token[1],
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    })
    .then(async resp => {
      let data = await url.parse("http://example.com?" + resp.data, {
        parseQueryString: true
      }).query;

      axios
        .get("https://api.github.com/user?access_token=" + data.access_token)
        .then(resp => {
          let userList = dataUtil
            .readConfigFile()
            ["allowed_users"].split(",")
            .map(item => item.trim())
            .map(item => item.toLowerCase());

          if (userList.indexOf(resp.data.login.toLowerCase()) >= 0) {
            res.send({
              token: data.access_token,
              respData: resp.data
            });
          }
          res.status(500);
        });
    });
});

async function verifyToken(token) {
  return await axios
    .get("https://api.github.com/user?access_token=" + token)
    .then(async data => {
      let userList = await Configuration.retrieveUserList();
      if (userList.indexOf(data.data.login.toLowerCase()) >= 0) {
        return "success";
      }
      return "error";
    })
    .catch(err => "error");
}

// HTTP
app.listen(port, () => console.log(`WIPCream listening on port ${port}!`));
