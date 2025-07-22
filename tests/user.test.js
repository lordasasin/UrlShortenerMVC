const { app, mongoose } = require("../index");
const request = require("supertest");
const config = require("../config/config");

let token; 

beforeAll(async () => {

  await mongoose.connect(config.MONGODUMMY_CONNECT);

  
  const registerRes = await request(app).post("/auth/register").send({
    username: "testuser",
    password: "123456",
  });
  
  token = `Bearer ${registerRes.body.token}`;
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
});


afterAll(async () => {
  await mongoose.connection.dropDatabase();

  await mongoose.connection.close();
});


describe("user", () => {
  describe("list", () => {
    it("GET /user/list is it working", async () => {
      const res = await request(app).get("/user/list").set("Authorization", token);

      expect(res.statusCode).toBe(200);
    });
  });

  describe("myurls", () => {
    it("GET /user/myurls is it working", async () => {
      const res = await request(app)
        .get("/user/myurls")
        .set("Authorization", token);
      expect(res.statusCode).toBe(200);
    });
  });
});
