const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const pino = require('pino');
const logger = pino();
const app = express();
app.use(express.json());











app.use("/user" , require('./router/userRouter'));
app.use("/auth" , require('./router/authRouter'));
app.use("/url" , require('./router/urlRouter'));


app.listen(process.env.PORT, () => {

    mongoose.connect(process.env.MONGO_CONNECT)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


    mongoose.connection.on('error', err => {
        logger.error(err);
      });

    console.log(`Server running on PORT ${process.env.PORT}`);
    console.log(`[POST] http://localhost:${process.env.PORT}/register  Body: { username, password }`);
    console.log(`[POST] http://localhost:${process.env.PORT}/login     Body: { username, password }`);
    console.log(`[POST] http://localhost:${process.env.PORT}/shorten   Body: { token, originalUrl }`);
    console.log(`[GET]  http://localhost:${process.env.PORT}/list → Herhangi bir tokene gerek yok herkes url leri görüntüleyebilir.`);
    console.log(`[GET]  http://localhost:${process.env.PORT}/myurls/:token → Kullanıcıya özel Url leri gösterir.`);
    console.log(`[GET]  http://localhost:${process.env.PORT}/:shortUrl  → Verdiğimiz kısa linki yönlendirme amaçlı.`);
});
