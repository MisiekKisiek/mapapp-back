const { Router } = require("express");
const MarkerController = require("../controllers/markerController");
const passport = require("passport");

module.exports = () => {
    const api = Router();

    api.get('/getAllMarkers', MarkerController.getAllMarkers);
    api.post('/addMarker', MarkerController.addMarker);
    api.put('/editMarker', MarkerController.editMarker);
    api.delete('/removeMarker', MarkerController.removeMarker);

    return api;
}