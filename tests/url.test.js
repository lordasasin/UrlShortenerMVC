const { app, mongoose } = require("../index");
const request = require("supertest");
const config = require("../config/config");
const User = require("../models/user");
const Url = require("../models/url");
const { registerTest } = require("../test_utils/auth.test.utils");
const {shortUrl} = require('../test_utils/url.test.utils');

let exampleShortUrl;
beforeAll(async () => {
  await mongoose.createConnection(config.MONGODUMMY_CONNECT);

});

beforeEach(async () => {
  await User.deleteMany();
  await Url.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("url", () => {


    it("POST /url/shorten is it working", async () => {
      const { token } = await registerTest("yusuf", "yusuf123");


      const res = await request(app)
      .post("/url/shorten")
      .set("Authorization", token)
      .send({ originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });


      exampleShortUrl = res.body.result.shortUrl;
      expect(res.body).not.toEqual({});
      expect(res.body.result.shortUrl).toBeDefined();
      expect(res.body.token).toBeDefined();
      expect(res.body.result.shortUrl).toBe(exampleShortUrl);
      expect(res.statusCode).toBe(200);

    
    });
    it("POST /url/shorten fails when originalUrl is wrong", async () => {
      const {token} = await registerTest("yusuf", "yusuf123");
 
       const res = await request(app)
       .post("/url/shorten")
       .set("Authorization", token)
       .send({
         originalUrl: "",
       });
       
       expect(res.body.error).toBeDefined();
       expect(res.statusCode).toBe(400);
     });

     it("POST /url/shorten fails when token wrong", async () => {
 
       const res = await request(app)
       .post("/url/shorten")
       .set("Authorization", "qwe123")
       .send({
         originalUrl: "",
       });
       
       expect(res.body.error).toBeDefined();
       expect(res.statusCode).toBe(401);
     });

     it("POST /url/shorten fails when token is empty", async () => {
      await registerTest("yusuf", "yusuf123");
 
       const res = await request(app)
       .post("/url/shorten")
       .set("Authorization","" )
       .send({
         originalUrl: "",
       });
       expect(res.statusCode).toBe(401);
       expect(res.body.error).toBeDefined();
     });


    it("POST /url/shorten fails when originalUrl is empty", async () => {
     const {token} = await registerTest("yusuf", "yusuf123");

      const res = await request(app)
      .post("/url/shorten")
      .set("Authorization", token)
      .send({
        originalUrl: "",
      });
      
      expect(res.body).not.toEqual({});
      expect(res.body.error).toBeDefined();
      expect(res.statusCode).toBe(400);
    });
  



    it("POST /url/shortUrl is it working", async () => {
    const forexample = await shortUrl();
      const res = await request(app)
        .post("/url/shortUrl")
        .send({forexample })

        expect(res.statusCode).toBeGreaterThan(200);
    });

    it("POST /url/shortUrl is wrong", async () => {
      const res = await request(app)
        .post("/url/shortUrl")
        .send("qwe123")

        expect(res.statusCode).toBe(404);
    });
    

    it("POST /url/shortUrl fails when shorturl is empty", async () => {
      const res = await request(app).post("/url/shortUrl").send({
        shortUrl: "",
      });
    
      expect(res.statusCode).toBe(404); 
    
    });
    

 
  });
