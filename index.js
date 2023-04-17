const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const DB = require('./config/db.js');
const routes = require("./routes");

app.use(bodyParser.json());

DB.CONNECT_DB();

app.use("/api/", routes);

const server = app.listen(3000, () => console.log("Server started on port 3000"));

module.exports = server