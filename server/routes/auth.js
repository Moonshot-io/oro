"use strict";
exports.__esModule = true;
var express_1 = require("express");
var passport_1 = require("passport");
// import passportAuth from '../passport';
var express_session_1 = require("express-session");
require('../passport');
console.log('auth file');
var authRouter = (0, express_1.Router)();
// passportAuth();
authRouter.use((0, express_session_1["default"])({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
authRouter.use(passport_1["default"].initialize());
authRouter.use(passport_1["default"].session());
var isLoggedIn = function (req, res, next) {
    req.user ? next() : res.sendStatus(401);
};
authRouter.get('/auth/success', function (req, res) {
    console.log('auth success');
    if (req.user) {
        // console.log(req.user);
        res.status(200).json({
            user: req.user,
            message: 'success',
            success: true
        });
    }
});
authRouter.get('/auth/google', passport_1["default"].authenticate('google', { scope: ['profile', 'email'] }), function (req, res) {
    console.log('auth get', req, res);
});
authRouter.get('/auth/google/callback', passport_1["default"].authenticate('google', { failureRedirect: '/' }), function (req, res) {
    // Successful authentication, redirect secrets.
    console.log('auth redirect', req, res);
    res.redirect('/');
});
authRouter.get('/logout', function (req, res) {
    req.logout(function () {
        res.redirect('/');
    });
});
exports["default"] = authRouter;
