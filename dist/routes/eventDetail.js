"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var express_1 = require("express");
var eventDetailsRouter = (0, express_1.Router)();
eventDetailsRouter.get('/', function (req, res) {
    var id = req.query.id;
    axios_1.default
        .get("https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=".concat(process.env.TICKETMASTER_API_KEY, "&id=").concat(id))
        .then(function (_a) {
        var data = _a.data;
        res.status(200).send(data);
    })
        .catch(function (error) { return console.error(error); });
});
exports.default = eventDetailsRouter;
