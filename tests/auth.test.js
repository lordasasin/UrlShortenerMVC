const { app, mongoose } = require("../index");
const request = require("supertest");
const dotenv = require("dotenv");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_CONNECT);
});

describe("register", () => {
  it("POST /register is it working", async () => {
    const res = await request(app).post("/register").send({
      username: "yusuf",
      password: "yusuf123",
    });

    expect(res.statusCode).toBe(200);
  });
});

describe("login", () => {
  it("POST /login is it working", async () => {
    const res = await request(app).post("/login").send({
      username: "yusuf",
      password: "yusuf123",
    });

    expect(res.statusCode).toBe(200);
  });
});
