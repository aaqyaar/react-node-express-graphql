const jwt = require("jsonwebtoken");

exports.JSON_WEB_TOKEN = {
  generateToken: ({ _id }) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  },
  verifyToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
  decode: (token) => {
    return jwt.decode(token);
  },
};
