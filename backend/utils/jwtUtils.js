const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  console.log("Secret Key:", secretKey);

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

module.exports = { 
  generateToken
};
