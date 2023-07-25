const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  allowedHouses: {
    type: [String],
    required: true,
  },
  ownedHouses: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Houses", houseSchema);
