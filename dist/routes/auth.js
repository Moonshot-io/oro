"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
require('../passport');
var authRouter = (0, express_1.Router)();
var isLoggedIn = function (req, res, next) {
    req.user ? next() : res.sendStatus(401);
};
authRouter.get('/', function (req, res) {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});
authRouter.get('/auth/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
authRouter.get('/google/callback', passport_1.default.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
}));
authRouter.get('/auth/failure', function (req, res) {
    res.send('something went wrong...');
});
authRouter.get('/protected', isLoggedIn, function (req, res) {
    res.send('Hello!');
});
exports.default = authRouter;
