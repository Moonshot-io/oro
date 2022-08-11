"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// const passport = require("passport");
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
var passportAuth = function () {
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
};
exports.default = passportAuth;
