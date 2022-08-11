"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// var passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth20").Strategy;
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
passport_1.default.use(new passport_google_oauth20_1.default.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, function (_request, _accessToken, _refreshToken, profile, done) {
    return done(err, profile);
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
function err(err, profile) {
    throw new Error('Function not implemented.');
}
