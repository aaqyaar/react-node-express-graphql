const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    lowercase: true,
  },
  name: { type: String, required: [true, "Name is required"] },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    unique: [true, "Phone must be unique"],
  },
  password: { type: String, required: [true, "Password is required"] },
  expenses: [
    {
      type: ObjectId,
      ref: "Expense",
      required: false,
    },
  ],
});

// hash password before saving to database
schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// encrypt password
schema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
// compare password
schema.methods.matchPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", schema);
