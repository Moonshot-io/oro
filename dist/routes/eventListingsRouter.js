"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var express_1 = require("express");
require('dotenv').config();
var eventListingsRouter = (0, express_1.Router)();
console.log('hello');
eventListingsRouter.get('/list', function (req, res) {
    console.log(req.query);
    // const punctuationless = req.query.keyword
    // .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
    // .replace(/\s{1,}/g, "+")
    // .toLowerCase();
    axios_1.default.get("https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=".concat(process.env.TICKETMASTER_API_KEY))
        .then(function (responseObj) { return console.log(responseObj); });
});
exports.default = eventListingsRouter;
