require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_CONNECT: process.env.MONGO_CONNECT
};
