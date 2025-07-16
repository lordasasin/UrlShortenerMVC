const { app, mongoose } = require("../index");
const request = require("supertest");
const config = require("../config/config");



beforeAll(async () => {

  await mongoose.connect(config.MONGODUMMY_CONNECT);
  
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();

})

describe("shorten", () => {
  it("POST /shorten is it working", async () => {
    const res = await request(app).post("/shorten").send({
      originalUrl:
        "https://www.google.com/imgres?q=aslan&imgurl=https%3A%2F%2Ffarukyalcinzoo.com%2Fwp-content%2Fuploads%2F2023%2F08%2FASLAN-HABER.jpg&imgrefurl=https%3A%2F%2Ffarukyalcinzoo.com%2Fbugun-dunya-aslan-gunu%2F&docid=TjK71n_GcwH4IM&tbnid=l9jrPGPCcaJvhM&vet=12ahUKEwih68z5-cCOAxU1BdsEHe2MD_IQM3oECAwQAA..i&w=1000&h=574&hcb=2&ved=2ahUKEwih68z5-cCOAxU1BdsEHe2MD_IQM3oECAwQAA",
    });
    expect(res.statusCode).toBe(200);
  });
});

describe("shortUrl", () => {
  it("POST /shortUrl is it working", async () => {
    const res = await request(app).post("/shortUrl").send({});
    expect(res.statusCode).toBe(200);
  });
});
