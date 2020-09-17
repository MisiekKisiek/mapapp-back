const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const MarkerSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    lng: Number,
    place: String,
    description: String,
});

const UserSchema = new mongoose.Schema({
    login: { type: String, unique: true, lowercase: true, trim: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    tasks: [MarkerSchema],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "login" });

module.exports = mongoose.model("UserMapapp", UserSchema);