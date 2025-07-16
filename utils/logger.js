const pino = require("pino");
const logger = pino();

const logg = (str) => {
  logger.error(str);
};

module.exports = {
  logg,
};
