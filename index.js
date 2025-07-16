const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const config = require("./config/config");
const { logg } = require("./utils/logger");
const app = express();
app.use(express.json());
const { authMiddleware } = require("./middleware/authMiddleware");

app.use("/user", authMiddleware, require("./router/user"));
app.use("/auth", require("./router/auth"));
app.use("/url", authMiddleware, require("./router/url"));



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
