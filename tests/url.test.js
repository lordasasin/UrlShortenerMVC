const { app, mongoose } = require("../index");
const request = require("supertest");
const config = require("../config/config");
const url = require('../models/url');

beforeAll(async () => {
  await mongoose.connect(config.MONGODUMMY_CONNECT);

    const registerRes = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "123456",
    });
    
    token = `Bearer ${registerRes.body.token}`;
});

afterEach(async () => {
  await url.deleteMany();
});


afterAll(async () => {

  await mongoose.connection.close();
});

describe("url", () => {
  describe("shorten", () => {


    it("POST /url/shorten is it working", async () => {
      const res = await request(app).post("/url/shorten").send(
        originalUrl = "https://www.youtube.com/results?search_query=ayya%C5%9F"
          
      ).set("Authorization", token);

      exampleShortUrl = res.body.shortUrl;

      expect(res.statusCode).toBeGreaterThan(200);
    });




    it("POST /url/shorten fails when originalUrl is empty", async () => {
      const res = await request(app).post("/url/shorten").send({
        originalUrl: "",
      });
      expect(res.statusCode).toBe(400);
    });

  });





  describe("shortUrl", () => {



    it("POST /url/shortUrl is it working", async () => {

      const res = await request(app).post("/url/shortUrl").send( exampleShortUrl );
      expect(res.statusCode).toBeGreaterThan(200);
    });



    it("POST /url/shortUrl fails when shorturl is empty", async () => {
      const res = await request(app).post("/url/shortUrl").send({
        shortUrl: ""
      });

      expect(res.statusCode).toBe(404);
    });
  });
});
