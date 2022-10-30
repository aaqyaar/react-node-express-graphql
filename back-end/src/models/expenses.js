const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  description: { type: String, required: [true, "Description is required"] },
  amount: { type: Number, required: [true, "Amount is required"] },
  category: { type: String, required: [true, "Category is required"] },
  isRecurring: { type: Boolean, required: [true, "Is Recurring is required"] },
  createdBy: { type: ObjectId, ref: "User" },
});

module.exports = mongoose.model("Expense", schema);
