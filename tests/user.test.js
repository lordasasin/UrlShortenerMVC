const { app, mongoose } = require("../index");
const request = require("supertest");
const config = require("../config/config");



beforeAll(async () => {

  await mongoose.connect(config.MONGODUMMY_CONNECT);
  
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();

})

describe("myurls", () => {
  it("GET /myurls is it working", async () => {
    const res = await request(app).get("/list").send({});
    expect(res.statusCode).toBe(200);
  });
});

describe("list", () => {
  it("GET /list is it working", async () => {
    const res = await request(app).get("/myurls").send({});
    expect(res.statusCode).toBe(200);
  });
});
