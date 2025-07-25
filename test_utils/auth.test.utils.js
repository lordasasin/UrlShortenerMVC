const request = require("supertest");
const { app } = require("../index");

const registerTest = async (username, password) => {
  const res = await request(app).post("/auth/register").send({
    username,
    password,
  });

  const token = `Bearer ${res.body.token}`;
  return { token, username, password };
};

module.exports = {
  registerTest,
};
