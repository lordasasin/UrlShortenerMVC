const User = require('../models/user');
const Url = require('../models/url');
const {getByShortUrl, newUrlRepo, getUrlsByUsername, getAllUrls} = require('../repository/urlRepository');
const {getByToken} = require('../repository/userRepository');

const getMyUrlsService = async (token) =>{
   

    try {
        const user = getByToken(token);
        if (!user) {
            throw new Error('Invaled Token');
        }

        getUrlsByUsername();
        

    } catch (err) {
        throw new Error('Server Error');
    }
}


const listUrlsService = async ()=>{
    try {
        const urls = getAllUrls();
        return urls;
    } catch (err) {
        throw new Error('Server Error');
    }
}

module.exports = {
    getMyUrlsService,
    listUrlsService
}