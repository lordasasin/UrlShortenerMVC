const { app, mongoose } = require("../index");
const request = require("supertest");
const config = require("../config/config");



beforeAll(async () => {

  await mongoose.connect(config.MONGODUMMY_CONNECT);
  
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();

})

describe("user", () => {
  describe("myurls", () => {
    it("GET /user/list is it working", async () => {
      const res = await request(app).get("/user/list");
      expect(res.statusCode).toBe(200);
    });
  });

  describe("list", () => {
    it("GET /user/myurls is it working", async () => {
      const res = await request(app).get("/user/myurls");
      expect(res.statusCode).toBe(200);
    });
  });
});
