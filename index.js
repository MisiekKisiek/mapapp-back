const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const dbConfig = require("./config/database.config");

//Routes
const markerRoutes = require('./routes/marker.routes');

mongoose.connect(dbConfig.mongoURL, dbConfig.settings);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (err) => {
    console.log("Could not connect to the database");
    process.exit();
});

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', markerRoutes())

app.listen(8005, (err) => {
    if (err) {
        console.log("Jakiś błąd", err);
    } else {
        console.log("Serwer działa.");
    }
});