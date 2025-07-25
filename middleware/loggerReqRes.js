const pino = require("pino");
const logger = pino();

const loggerReqRes = (req, res, next) => {
  const originalSend = res.send;
  

  res.send = function (body) {
    logger.info(
      JSON.stringify({
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        response: body,
        headers: req.headers,
      }),
    );

    return originalSend.call(this, body);
  };

  next();
};

module.exports = loggerReqRes;
