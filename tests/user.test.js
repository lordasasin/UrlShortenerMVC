const { app, mongoose } = require("../index");
const request = require("supertest");
const config = require("../config/config");
const { registerTest } = require("../test_utils/auth.test.utils");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Url = require("../models/url");

let token;

beforeAll(async () => {
  await mongoose.createConnection(config.MONGODUMMY_CONNECT);

});

beforeEach(async () => {
  await User.deleteMany();
  await Url.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();

  await mongoose.disconnect();
});

describe("User", () => {
  it("GET /user/myurls is it working", async () => {
    const { token } = await registerTest("yusuf", "yusuf123");
    const res = await request(app)
      .get("/user/myurls")
      .set("Authorization", token);

    expect(res.body).not.toEqual({});
    expect(res.statusCode).toBe(200);
   
  });

  it("GET /user/myurls is empty", async () => {
    const { token } = await registerTest("yusuf", "yusuf123");
    const res = await request(app)
      .get("/user/myurls")
      .set("Authorization", token);

      expect(res.body).toEqual({ myurls: [] });
      expect(res.statusCode).toBe(200);

   
  });

  it("GET /user/myurls is with wrong token", async () => {
    const res = await request(app)
      .get("/user/myurls")
      .set("Authorization", "qwe123");

      expect(res.body.error).toBeDefined();

      expect(res.statusCode).toBe(401);

   
  });

  it("GET /user/myurls without token", async () => {
    res = await request(app).get("/user/myurls");
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBeDefined();
   
  });

  it("GET /user/myurls with expired token", async () => {
    const expiredToken = jwt.sign({ id: "fakeid" }, config.JWT_SECRET_KEY, { expiresIn: -10 });
    const res = await request(app)
      .get("/user/myurls")
      .set("Authorization", `Bearer ${expiredToken}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBeDefined();
  });


   
  

  


  it("GET /user/list is it working", async () => {
    const res = await request(app).get("/user/list");

    
    expect(res.body).not.toEqual({});
    expect(res.statusCode).toBe(200);
  });

  it("GET /user/list is empty", async () => {
    const res = await request(app).get("/user/list");

    
    expect(res.body).toEqual([]);
    expect(res.statusCode).toBe(200);
  });

 
});