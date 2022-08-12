"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var artistsRouter = (0, express_1.Router)();
var db_1 = __importDefault(require("../database/db"));
artistsRouter.get('/', function (req, res) {
    db_1.default.artistFollowing.findMany()
        .then(function (artistData) {
        console.info(artistData);
        res.status(200).send(artistData);
    })
        .catch(function (err) {
        // console.error(err);
        res.status(500);
        res.end();
    });
    // axios.get(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=SptQUng7VWQQ0BVM0uspyhpoyHGkNSq4&keyword=${artistName}`)
    //   .then((artistData) => {
    //     console.info(artistData);
    //     res.status(200).send(artistData.data._embedded);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     res.status(500);
    //     res.end();
    //   });
});
exports.default = artistsRouter;
