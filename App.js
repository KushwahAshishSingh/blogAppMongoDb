require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./users/user.router");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));
app.use("/user", userRouter);

const port = 3000;
// error in listening process.env.APP_PORT from .env
app.listen(port, () => {
  console.log("server running on the port:" + port);
});
