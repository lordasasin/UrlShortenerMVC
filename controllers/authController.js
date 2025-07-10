const { loginUserService, registerUserService } = require('../services/authService');


const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {

        const result = await registerUserService({ username, password });
        res.status(201).json(result);
    } 
    catch (err) {
        res.status(400).json({ error : 'Error'});
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await loginUserService({ username, password });
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error : 'Error' });
    }
};

module.exports = {
    registerUser,
    loginUser
};
