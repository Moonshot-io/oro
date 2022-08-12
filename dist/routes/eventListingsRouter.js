"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var express_1 = require("express");
require('dotenv').config();
var eventListingsRouter = (0, express_1.Router)();
eventListingsRouter.get('/list', function (req, res) {
    var keyword = req.query.keyword;
    axios_1.default.get("https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=".concat(keyword, "&apikey=").concat(process.env.TICKETMASTER_API_KEY))
        .then(function (responseObj) {
        var venueInfo;
        var events = responseObj.data._embedded.events.filter(function (event) {
            return event._embedded;
        }).map(function (event) {
            var newDataObj = {
                eventDate: event.dates.start.dateTime,
                eventId: event.id,
            };
            var artistInfo = event._embedded.attractions.map(function (attraction) {
                var artistInfo = {
                    artistName: attraction.name,
                    artistId: attraction.id,
                    artistImages: attraction.images
                };
                return artistInfo;
            });
            var venueInfo = event._embedded.venues.map(function (venue) {
                var venueInfo = {
                    venueId: venue.id,
                    venueName: venue.name,
                    address: venue.address,
                    city: venue.city.name,
                    state: venue.state.name,
                    stateCode: venue.stateCode,
                    country: venue.country.name,
                    postalCode: venue.postalCode,
                    location: venue.location,
                    venueImages: venue.images
                };
                return venueInfo;
            });
            newDataObj.venueInfo = venueInfo;
            newDataObj.artistInfo = artistInfo;
            return newDataObj;
        });
        res.send({
            events: events
        });
        res.status(200);
    })
        .catch(function (err) { return console.error(err); });
});
exports.default = eventListingsRouter;
