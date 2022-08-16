"use strict";
exports.__esModule = true;
require('dotenv').config();
var express_1 = require("express");
var axios_1 = require("axios");
var db_1 = require("../database/db");
var profileRouter = (0, express_1.Router)();
var TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;
profileRouter.get('/events', function (req, res) {
    db_1["default"].userEvents.findMany({ where: { userId: 1 } })
        .then(function (userEvents) {
        var _a;
        var eventId = (_a = userEvents[0]) === null || _a === void 0 ? void 0 : _a.eventAPIid;
        axios_1["default"].get("https://app.ticketmaster.com/discovery/v2/events.json?apikey=".concat(TICKETMASTER_API_KEY, "&id=").concat(eventId))
            .then(function (event) {
            res.status(200).send(event.data._embedded.events[0]);
        })["catch"](function (err) {
            console.error(err);
        });
    })["catch"](function (err) {
        res.send(500);
    });
});
exports["default"] = profileRouter;
