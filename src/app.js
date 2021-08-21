//jshint esversion:6
require('dotenv').config();
const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const flash = require('connect-flash');
const session = require("express-session");
const passport = require("passport");

const {
    mongoLocalURL,
    mongoAtlasURL
} = require("./config/keys");
const users = require("./routes/users");
const initializePassport = require("../src/config/passport-config");


const app = express();

// PORT
const PORT = process.env.PORT || 3000;


// Database connection
mongoose.connect(mongoAtlasURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

// View Engine and public
app.use(express.static("public"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({
    extended: true
}));

// Express session
app.use(session({
    secret: process.env.SESSION,
    resave: false, // environment variables are not resaved if nothing has changed
    saveUninitialized: false // empty values are not stored in the session if session is uninitialzied
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Initialize passport
initializePassport(passport);

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});


// Routes
app.use('/', users);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});