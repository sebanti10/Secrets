const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User");

function initializePassport(passport) {
    passport.use(User.createStrategy());

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });

    passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/secrets",
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
        },
        (accessToken, refreshToken, profile, cb) => {
            //console.log(profile);
            User.findOrCreate({
                googleId: profile.id
            }, (err, user) => cb(err, user));
        }
    ));
}

module.exports = initializePassport;