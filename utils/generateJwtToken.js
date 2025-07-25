const jwt = require("jsonwebtoken");
const config = require("../config/config");

function generateJwtToken(user) {
  try {
    return jwt.sign(
      { id: user.id , username: user.username },
      config.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );
  } catch (error) {
    console.error("JWT token üretim hatası:", error);
    throw error;
  }
}

module.exports = generateJwtToken;
