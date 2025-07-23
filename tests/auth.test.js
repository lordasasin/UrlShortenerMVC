const { app ,mongoose } = require("../index");
const request = require("supertest");
const config = require("../config/config");
const user = require('../models/user');



beforeAll(async () => {

  await mongoose.connect(config.MONGODUMMY_CONNECT);
});


afterAll(async () => {
  
  await user.deleteMany();
  await mongoose.connection.close();
});

describe("auth", () => {
  describe("register", () => {
    it("POST /auth/register is it working", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "yusuf",
        password: "yusuf123",
      });

      expect(res.statusCode).toBe(201);
    });

    it("POST /auth/register fails when username and password is empty", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "",
        password: "",
      });

      expect(res.statusCode).toBe(400);
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

    it("POST /auth/login fails when user input wrong username and password", async () => {
      const res = await request(app).post("/auth/login").send({
        username: "wronguser",
        password: "wrongpass",
      });

      expect(res.statusCode).toBe(400);
    });

    it("POST /auth/login fails when username and password is empty", async () => {
      const res = await request(app).post("/auth/login").send({
        username: "",
        password: "",
      });

      expect(res.statusCode).toBe(400);
    });
  });
});
