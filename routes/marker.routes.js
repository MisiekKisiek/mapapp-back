const { Router } = require("express");
const MarkerController = require("../controllers/markerController");
const passport = require("passport");

module.exports = () => {
    const api = Router();

    api.get('/getAllMarkers', MarkerController.getAllMarkers)

    return api;
}