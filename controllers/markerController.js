const UserMapapp = require('../models/user.model');

async function getAllMarkers(req, res, next) {
    console.log(req.user);
    await UserMapapp.findOne({ _id: req.user._id }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json("There is no user.");
        }
        console.log(user)
        return res.json(user);
    });
}

async function addMarker(req, res, next) {
    const { name, lat, lng, place, description } = req.body;
}

async function editMarker(req, res, next) {
    const { markerId, name, lat, lng, place, description } = req.body
    console.log(typeof markerId);
    await UserMapapp.findOne({ _id: markerId }, (err, user) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.json("There is no user.")
        }
        user.markers[user.markers.findIndex(e => markerId === e.id.toString())] = {
            id: markerId, name, lat: parseFloat(lat), lng: parseFloat(lng), place, description
        }
        console.log(user);
        user.save((err) => {
            if (err) return res.json(err);
        });
        return res.json("Task changed successfull");
    })
}

module.exports = { getAllMarkers, editMarker }
