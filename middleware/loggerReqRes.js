const loggerReqRes = (req, res, next) => {
    const originalSend = res.send;
  
    res.send = function (body) {
      console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} → ${res.statusCode}`);
      console.log(JSON.stringify(req.headers));

      return originalSend.call(this, body);
    };
  
    next();
  };
  
  module.exports = loggerReqRes;
  