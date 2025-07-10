const { getMyUrlsService, listUrlsService } = require('../services/userService');

const getMyUrls = async (req, res) => {
    const { token } = req.params;

    try {
        const urls = await getMyUrlsService(token);
        res.status(200).json(urls);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const listUrls = async (req, res) => {
    try {
        const urls = await listUrlsService();
        res.status(200).json(urls);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getMyUrls,
    listUrls,
};
