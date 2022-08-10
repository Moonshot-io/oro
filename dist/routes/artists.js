"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var axios_1 = __importDefault(require("axios"));
var artistsRouter = (0, express_1.Router)();
artistsRouter.get('/', function (req, res) {
    console.log('get artists-----', req.query);
    var artistName = req.query.artistName;
    console.log(artistName);
    axios_1.default.get("https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=SptQUng7VWQQ0BVM0uspyhpoyHGkNSq4&keyword=".concat(artistName))
        .then(function (artistData) {
        console.log(artistData);
        res.status(200).send(artistData.data._embedded);
    })
        .catch(function (err) {
        console.error(err);
        res.status(500);
        res.end();
    });
});
exports.default = artistsRouter;
