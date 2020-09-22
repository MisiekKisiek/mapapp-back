const UserMapapp = require('../models/user.model');

async function getAllMarkers(req, res, next) {
    console.log('Sended markers');
    await UserMapapp.findOne({ _id: '5f61f2b9a1950532c93d78b0' }, (err, user) => {
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

async function editMarker(req, res, next) {
    const { markerId, name, lat, lng, place, description } = req.body
    console.log(markerId, name, lat, lng, place, description);
    console.log('Edited');
    await UserMapapp.findOne({ _id: '5f61f2b9a1950532c93d78b0' }, (err, user) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.json("There is no user.")
        }
        res.json(user.markers);
        console.log(user)
        // user = JSON.parse(JSON.stringify(user));
        // console.log(user.markers);
        // let userMarker = user.markers[user.markers.findIndex(e => markerId.toString() === e.id.toString())]
        // userMarker = { id: markerId, name, lat, lng, place, description }
        // user.markers[user.markers.findIndex(e => markerId.toString() === e.id.toString())] = userMarker;
        // user.save((err) => {
        //     if (err) return res.json(err);
        // });
        // return res.json("Task changed successfull");
    })
}

module.exports = { getAllMarkers, editMarker }
