const { userLogin, userRegister } = require("../services/auth");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await userRegister({ username, password });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const loginUser = async (req, res) => {

  const { username, password } = req.body;
  console.log("Login request:", { username, password }); 
  try {
    const result = await userLogin({ username, password });
    console.log("Login success:", result); 
    res.status(200).json(result);
  } catch (err) {
    console.log("Login error:", err.message || err.toString()); 
    res.status(400).json({ error: err.message || err.toString() });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
