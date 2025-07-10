const User = require('../models/user');
const Url = require('../models/url');


const getMyUrlsService = async (token) =>{
   

    try {
        const user = await User.findOne({ token });
        if (!user) {
            throw new Error('Invaled Token');
        }

        const urls = await Url.find({ createdBy: user.username });
        

        return urls;
    } catch (err) {
        throw new Error('Server Error');
    }
}


const listUrlsService = async ()=>{
    try {
        const urls = await Url.find();
        return urls;
    } catch (err) {
        throw new Error('Server Error');
    }
}

module.exports = {
    getMyUrlsService,
    listUrlsService
}