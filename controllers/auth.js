const {
  loginUserService,
  registerUserService,
} = require("../services/auth");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await registerUserService({ username, password });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await loginUserService({ username, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
