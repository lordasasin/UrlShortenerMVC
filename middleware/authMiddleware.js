const jwt = require("jsonwebtoken");
const config = require("../config/config");
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = {
  authMiddleware,
};
