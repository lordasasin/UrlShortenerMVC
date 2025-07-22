const pino = require('pino')
const logger = pino();

const loggerReqRes = (req, res, next) => {
    const originalSend = res.send;
  
    res.send = function (body) {
      logger.info(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} → ${body}`);
      logger.info(JSON.stringify(req.headers));


      return originalSend.call(this, body);
    };
  
    next();
  };
  
  module.exports = loggerReqRes;
  