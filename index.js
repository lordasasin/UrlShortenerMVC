const express = require("express");
const mongoose = require("mongoose");

const config = require("./config/config");
const { logg } = require("./utils/logger");
const app = express();
const loggerReqRes = require("./middleware/loggerReqRes");
app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

app.use(loggerReqRes);
app.use("/user", require("./router/user"));
app.use("/auth", require("./router/auth"));
app.use("/url", require("./router/url"));

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/shorten", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "shorten.html"));
});

app.get("/list", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "allUrls.html"));
});

app.get("/myurls", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "myurls.html"));
});

app.get("/shorten/adv", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "adv.html"));
});

app.listen(config.PORT, () => {
  mongoose
    .connect(config.MONGO_CONNECT)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

  mongoose.connection.on("error", (err) => {
    logg(err);
  });

  console.log(`Server running on PORT ${process.env.PORT}`);
  console.log(
    `[POST] http://localhost:${process.env.PORT}/register  Body: { username, password }`,
  );
  console.log(
    `[POST] http://localhost:${process.env.PORT}/login     Body: { username, password }`,
  );
  console.log(
    `[POST] http://localhost:${process.env.PORT}/shorten   Body: { token, originalUrl }`,
  );
  console.log(
    `[GET]  http://localhost:${process.env.PORT}/list → Herhangi bir tokene gerek yok herkes url leri görüntüleyebilir.`,
  );
  console.log(
    `[GET]  http://localhost:${process.env.PORT}/myurls/:token → Kullanıcıya özel Url leri gösterir.`,
  );
  console.log(
    `[GET]  http://localhost:${process.env.PORT}/:shortUrl  → Verdiğimiz kısa linki yönlendirme amaçlı.`,
  );
});

module.exports = {
  app,
  mongoose,
};
