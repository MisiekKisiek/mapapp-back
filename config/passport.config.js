const passport = require("passport");
const passportJWT = require("passport-jwt");
const UserMapapp = require("../models/user.model");

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

function verify(payload, done) {
    return UserMapapp.findOne({ _id: payload.id })
        .then((user) => done(null, user))
        .catch((err) => done(err));
}

module.exports = () => {
    const config = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    };
    passport.use(UserMapapp.createStrategy())
    passport.use(new JWTStrategy(config, verify));
}