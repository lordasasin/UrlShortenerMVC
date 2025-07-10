const mongoose = require('mongoose');


const urlSchema = new mongoose.Schema({
    shortUrl: String,
    originalUrl: String,
    createdBy: String
});
const Url = mongoose.model('Url', urlSchema);

module.exports = Url;