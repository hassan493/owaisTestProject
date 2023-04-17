const express = require("express");
const itemsRoute = require("./items.route");
const router = express.Router();

module.exports = router;

router.use("/items", itemsRoute);
