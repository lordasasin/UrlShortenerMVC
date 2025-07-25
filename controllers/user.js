const { getUserUrls, listAllUrls } = require("../services/user");

const getMyUrls = async (req, res) => {

  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  try {
    const userId = req.user.id;

    const urls = await getUserUrls(userId);

    res.status(200).json({ myurls: urls });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const listUrls = async (req, res) => {
  try {
    const urls = await listAllUrls();
    res.status(200).json(urls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMyUrls,
  listUrls,
};
