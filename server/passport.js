"use strict";
exports.__esModule = true;
require('dotenv').config();
var passport_1 = require("passport");
var passport_google_oauth20_1 = require("passport-google-oauth20");
console.log('passport file');
passport_1["default"].use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    passReqToCallback: true
}, (function (accessToken, refreshToken, profile, done) {
    console.log('profile', profile, accessToken, refreshToken);
    return done(null, profile);
})));
passport_1["default"].serializeUser(function (user, done) {
    done(null, user);
});
passport_1["default"].deserializeUser(function (user, done) {
    done(null, user);
});
