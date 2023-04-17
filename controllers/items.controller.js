const Item = require("../models/items");
const itemValidator = require("../validators/item.validator");
const CONST = require("../const");

module.exports = {
  createItem,
  getItems,
  getItemByID,
  updateItem,
  deleteItem,
};

async function createItem(req, res) {
  const reqBody = req.body;

  const { error } = itemValidator.ItemSchema.validate(reqBody);
  if (error !== undefined) {
    return res.send({ message: `${CONST.INVALID_BODY}`, error });
  }

  const item = new Item(reqBody);

  try {
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getItems(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "name";
  const order = req.query.order === "desc" ? -1 : 1;
  const filter = JSON.parse(req.query.filter) || {};

  console.log(filter);

  try {
    const items = await Item.find(filter)
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getItemByID(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: CONST.ITEM_NOT_FOUND });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateItem(req, res) {
  const reqBody = req.body;

  const { error } = itemValidator.ItemSchema.validate(reqBody);
  if (error !== undefined) {
    return res.send({ message: `${CONST.INVALID_BODY}`, error });
  }

  try {
    const item = await Item.findByIdAndUpdate(req.params.id, reqBody, { new: true });
    if (!item) return res.status(404).json({ message: CONST.ITEM_NOT_FOUND });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteItem(req, res) {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: CONST.ITEM_NOT_FOUND });
    res.send({ message: CONST.ITEM_DELETED });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
