#!/usr/bin/env node

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var fs = require("fs");
var path = require("path");
var axios = require("axios").default;
var serviceAccount = path.join(path.dirname(__dirname), "serviceAccount.json");
var credentialUrl = process.env.FIREBASE_SERVICE_ACCOUNT;

if (fs.existsSync(serviceAccount)) {
  console.log("> serviceAccount.json already existed");
  process.exit();
}

console.log("> Downloading serviceAccount.js");

axios
  .get(credentialUrl)
  .then(({ data }) => {
    fs.writeFileSync(serviceAccount, JSON.stringify(data), "utf-8");
  })
  .catch((e) => {
    console.log("> Error on downloading serviceAccount.js");
    console.log("-".repeat(50));
    console.log(e.toString());
    console.log("-".repeat(50));
    process.exit(1);
  });
