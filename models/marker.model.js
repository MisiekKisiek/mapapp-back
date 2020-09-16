const mongoose = require("mongoose");

const MarkerSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    lng: Number,
    place: String,
    description: String,
});

module.exports = mongoose.model('MarkerSchema', MarkerSchema)