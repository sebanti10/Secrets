require('dotenv').config();
const express = require("express");
const bcrypt = require('bcrypt');
const passport = require("passport");
const User = require("../models/User");

// Router
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/auth/google",
    passport.authenticate('google', {
        scope: ["profile"]
    })
);

router.get("/auth/google/secrets",
    passport.authenticate("google", {
        failureRedirect: "/login"
    }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect("/secrets");
    });

// Login page
router.get("/login", (req, res) => {
    res.render("login");
});

// Register page
router.get("/register", (req, res) => {
    res.render("register");
});

// Secrets dashboard
router.get("/secrets", (req, res) => {
    User.find({
        "secret": {
            $ne: null
        }
    }, (err, foundUsers) => {
        if (err)
            console.log(err);
        else {
            if (foundUsers) {
                res.render("secrets", {
                    usersWithSecrets: foundUsers
                });
            }
        }
    });
});

// Submit
router.get("/submit", (req, res) => {
    // Show submit page on successful authentication
    if (req.isAuthenticated())
        res.render("submit");
    else
        res.redirect("/login");
});

// POST submit
router.post("/submit", (req, res) => {
    const submittedSecret = req.body.secret;

    console.log(req.user.id);

    User.findById(req.user.id, (err, foundUser) => {
        if (err)
            console.log(err);
        else {
            if (foundUser) {
                foundUser.secret = submittedSecret;
                foundUser.save(() => res.redirect("/secrets"));
            }
        }
    });
});

// POST register handle
router.post("/register", (req, res) => {
    User.register({
        username: req.body.username
    }, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    });
});

// POST login handle
router.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if (err)
            console.log(err);
        else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            });
        }
    });
});

// Logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;