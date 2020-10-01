const UserMapapp = require('../models/user.model');
const Marker = require('../models/marker.model');

async function getAllMarkers(req, res, next) {
    await UserMapapp.findOne({ _id: req.user.id }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json("There is no user.");
        }
        return res.json(user);
    });
}

async function addMarker(req, res, next) {
    const { name, lat, lng, place, description } = req.body;
    await UserMapapp.findOne({ _id: req.user._id }, (err, user) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.json("There is no user.")
        }
        const marker = new Marker({ name, lat, lng, place, description });

        user.markers.push(marker)
        user.save((err) => {
            if (err) return res.json(err);
        })

        return res.json(user);
    })
}

async function editMarker(req, res, next) {
    const { markerId, name, lat, lng, place, description } = req.body
    await UserMapapp.findOne({ _id: req.user._id }, (err, user) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.json("There is no user.")
        }
        user.markers[user.markers.findIndex(e => markerId === e.id.toString())].lat = parseFloat(lat);
        user.markers[user.markers.findIndex(e => markerId === e.id.toString())].lng = parseFloat(lng);
        user.markers[user.markers.findIndex(e => markerId === e.id.toString())].place = place;
        user.markers[user.markers.findIndex(e => markerId === e.id.toString())].description = description;
        user.save((err) => {
            if (err) return res.json(err);
        });
        return res.json("Task changed successfull");
    })
}

module.exports = { getAllMarkers, editMarker, addMarker }
