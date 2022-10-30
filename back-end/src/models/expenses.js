const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  description: String,
  amount: Number,
  category: String,
  isRecurring: Boolean,
  createdBy: { type: ObjectId, ref: "User" },
});

module.exports = mongoose.model("Expense", schema);
