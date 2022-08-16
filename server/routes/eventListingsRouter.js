"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var express_1 = require("express");
var db_1 = require("../database/db");
require('dotenv').config();
var eventListingsRouter = (0, express_1.Router)();
eventListingsRouter.get('/list', function (req, res) {
    var keyword = req.query.keyword;
    axios_1["default"].get("https://app.ticketmaster.com/discovery/v2/events.json?size=5&keyword=".concat(keyword, "&apikey=").concat(process.env.TICKETMASTER_API_KEY))
        .then(function (responseObj) {
        var venueInfo;
        var events = responseObj.data._embedded.events.filter(function (event) {
            return event._embedded;
        }).map(function (event) {
            var newDataObj = {
                eventDate: event.dates.start.dateTime,
                eventId: event.id,
                eventName: event.name
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
                    state: null,
                    stateCode: venue.stateCode,
                    country: venue.country.name,
                    postalCode: venue.postalCode,
                    location: venue.location,
                    venueImages: venue.images
                };
                if (venue.state) {
                    venueInfo.state = venue.state.name;
                }
                return venueInfo;
            });
            newDataObj.venueInfo = venueInfo;
            newDataObj.artistInfo = artistInfo;
            return newDataObj;
        });
        res.status(200).send({ events: events });
    })["catch"](function (err) { return console.error(err); });
});
eventListingsRouter.post('/list/pins', function (req, res) {
    // console.log('POST REQ', req.body, 'POST RES', res)
    var pinObj = req.body;
    db_1["default"].userEvents.create({
        data: pinObj
    }).then(function (data) {
        res.send(data).status(201);
    })["catch"](function (err) {
        console.error('BACKEND POST REQ ERR', err);
        res.sendStatus(500);
    });
});
eventListingsRouter.get('/list/pins', function (req, res) {
    db_1["default"].userEvents.findMany()
        .then(function (eventData) {
        res.send(eventData).status(200);
    })["catch"](function (err) {
        console.error(err);
        res.status(500).end();
    });
    eventListingsRouter["delete"]('/list/pins', function (req, res) {
        var eventAPIid = req.body.eventAPIid;
        db_1["default"].userEvents.deleteMany({
            where: {
                eventAPIid: {
                    contains: eventAPIid
                }
            }
        })
            .then(function (results) {
            res.sendStatus(200);
        })["catch"](function (err) {
            res.sendStatus(500);
        });
    });
});
exports["default"] = eventListingsRouter;
