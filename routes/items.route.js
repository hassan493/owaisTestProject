const express = require("express");
const asyncHandler = require("express-async-handler");
const itemsController = require("../controllers/items.controller");

const router = express.Router();
module.exports = router;

router.post("/", asyncHandler(itemsController.createItem));
router.get("/", asyncHandler(itemsController.getItems));
router.get("/:id", asyncHandler(itemsController.getItemByID));
router.put("/:id", asyncHandler(itemsController.updateItem));
router.delete("/:id", asyncHandler(itemsController.deleteItem));
