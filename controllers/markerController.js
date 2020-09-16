const User = require('../models/user.model');

async function getAllMarkers(req, res, next) {
    console.log('Poszło');
    await User.findOne({ _id: '5f61f2b9a1950532c93d78b0' }, (err, user) => {
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

module.exports = { getAllMarkers }