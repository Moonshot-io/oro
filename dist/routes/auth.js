"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
require('../passport');
var authRouter = (0, express_1.Router)();
// passportAuth();
authRouter.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
authRouter.use(passport_1.default.initialize());
authRouter.use(passport_1.default.session());
var isLoggedIn = function (req, res, next) {
    req.user ? next() : res.sendStatus(401);
};
authRouter.get('/auth/success', function (req, res) {
    if (req.user) {
        console.log(req.user);
        res.status(200).json({
            user: req.user,
            message: 'success',
            success: true,
        });
    }
});
authRouter.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }), function (req, res) {
    console.log(req);
});
authRouter.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), function (req, res) {
    // Successful authentication, redirect secrets.
    console.log(req);
    res.redirect('/');
});
authRouter.get('/logout', function (req, res) {
    req.logout(function () {
        res.redirect('/');
    });
});
exports.default = authRouter;
