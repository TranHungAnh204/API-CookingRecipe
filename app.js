var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Get MongoDB URL from environment variables
const MONGODB_URL = process.env.MONGODB_URL;

// Kết nối đến MongoDB Atlas
// Kết nối đến MongoDB Atlas
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
  .catch((err) => console.log(">>>>>>>>> DB Error: ", err));
var userRouter = require("./routes/user");
var adminRouter = require("./routes/admin");
var cateRouter = require("./routes/category");
var nguyenLieuRouter = require("./routes/nguyenLieu");
var congThucRouter = require("./routes/congThuc");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/category", cateRouter);
app.use("/nguyenLieu", nguyenLieuRouter);
app.use("/congThuc", congThucRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
