const mongoose =  require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

const Item = new mongoose.model("Item", ItemSchema);

module.exports = Item;
