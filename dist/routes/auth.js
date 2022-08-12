"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var passport_2 = __importDefault(require("../passport"));
var successLoginUrl = 'http://localhost:5000/';
var authRouter = (0, express_1.Router)();
authRouter.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
authRouter.use(passport_1.default.initialize());
authRouter.use(passport_1.default.session());
(0, passport_2.default)();
var isLoggedIn = function (req, res, next) {
    req.user ? next() : res.sendStatus(401);
};
authRouter.get('/', function (_req, res) {
    res.send('<a href="/auth/auth/google">Authenticate with Google</a>');
});
authRouter.get('/auth/google', passport_1.default.authenticate("google", { scope: ['profile', 'email'] }));
authRouter.get('/auth/google/callback', passport_1.default.authenticate('google', {
    successRedirect: successLoginUrl,
}), function (req, res) {
    console.log(req);
});
authRouter.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});
exports.default = authRouter;
