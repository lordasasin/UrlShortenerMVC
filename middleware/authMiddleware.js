const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token not exist!!!!!'});
  }

  try {

    const user = await User.findOne({ token });
    req.user = user ;
   next();
  } 
  
  catch (err) {
    return res.status(500).json({ error: 'Server Err' });
  }
};

module.exports = {
    authMiddleware
}
