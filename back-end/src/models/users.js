const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  email: { type: String, required: [true, "Email is required"] },
  name: { type: String, required: [true, "Name is required"] },
  phone: { type: String, required: [true, "Phone is required"] },
  password: { type: String, required: [true, "Password is required"] },
  expenses: [
    {
      type: ObjectId,
      ref: "Expense",
      required: [true, "Expenses is required"],
    },
  ],
});

module.exports = mongoose.model("User", schema);
