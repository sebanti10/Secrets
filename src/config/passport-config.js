require('dotenv').config();
const {
    callBackLocalURL,
    callBackProdURL,
    userProfileURL
} = require("./keys");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User");

function initializePassport(passport) {
    passport.use(User.createStrategy());

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });

    const callBackURL = process.env.NODE_ENV === 'production' ? callBackProdURL : callBackLocalURL;

    // passport.use(new GoogleStrategy({
    //         clientID: process.env.CLIENT_ID,
    //         clientSecret: process.env.CLIENT_SECRET,
    //         callbackURL: callBackURL,
    //         userProfileURL: userProfileURL
    //     },
    //     (accessToken, refreshToken, profile, cb) => {
    //         //console.log(profile);
    //         User.findOrCreate({
    //             googleId: profile.id
    //         }, (err, user) => cb(err, user));
    //     }
    // ));
}

module.exports = initializePassport;