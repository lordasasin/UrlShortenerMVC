const { app, mongoose } = require("../index");
const request = require("supertest");
const config = require("../config/config");



beforeAll(async () => {

  await mongoose.connect(config.MONGODUMMY_CONNECT);
  
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();

})



describe("register", () => {
  it("POST /auth/register is it working", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "yusuf",
      password: "yusuf123",
    });

    expect(res.statusCode).toBe(201);
  });
});

describe("login", () => {
  it("POST /auth/login is it working", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "yusuf",
      password: "yusuf123",
    });

    expect(res.statusCode).toBe(200);

  });
});
