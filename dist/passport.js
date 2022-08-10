"use strict";
require('dotenv').config();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
passport.use(new GoogleStrategy({
    clientID: process.env.
        clientSecret,
    process: process,
    : .env.
}));
