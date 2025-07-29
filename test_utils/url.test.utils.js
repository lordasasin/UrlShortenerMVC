const {registerTest} = require('./auth.test.utils');
const request = require("supertest");
const { app } = require("../index");

const shortUrl = async ()=>{


    const { token } = await registerTest("yusuf", "yusuf123");


    const res = await request(app)
    .post("/url/shorten")
    .set("Authorization", token)
    .send({ originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });


    url = res.body.result.shortUrl;


return url ;
  
  
}

module.exports={
    shortUrl,
}