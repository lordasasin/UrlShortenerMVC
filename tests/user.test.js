const { app } = require("../index");
const request = require("supertest");

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
