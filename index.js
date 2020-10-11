const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const dbConfig = require("./config/database.config");

//MIDDLEWARES
const jwtAuth = require("./middlewares/auth.middleware");

//STRATEGY
const passport = require("./config/passport.config");
passport();

//Routes
const authRoutes = require("./routes/authUser.routes");
const markerRoutes = require("./routes/marker.routes");

mongoose.connect(dbConfig.mongoURL, dbConfig.settings);
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", (err) => {
  console.log("Could not connect to the database");
  process.exit();
});

const app = express();

app.use(express.json());
app.use(express.static(path.resolve()));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes());
app.use("/api", jwtAuth, markerRoutes());

app.listen(8005, (err) => {
  if (err) {
    console.log("Jakiś błąd", err);
  } else {
    console.log("Serwer działa.");
  }
});
