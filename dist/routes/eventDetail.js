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
        var singleEvent = data._embedded.events[0];
        var eventDetails = {
            name: singleEvent.name,
            image: singleEvent.images[0],
            dates: {
                localDate: singleEvent.dates.start.localDate,
                localTime: singleEvent.dates.start.localTime,
                dateTime: singleEvent.dates.start.dateTime,
                dateTBD: singleEvent.dates.start.dateTBD,
                dateTBA: singleEvent.dates.start.dateTBA,
                timeTBA: singleEvent.dates.start.timeTBA,
                noSpecificTime: singleEvent.dates.start.noSpecificTime,
            },
            venues: {
                name: singleEvent._embedded.venues[0].name,
                type: singleEvent._embedded.venues[0].type,
                id: singleEvent._embedded.venues[0].id,
                test: singleEvent._embedded.venues[0].test,
                locale: singleEvent._embedded.venues[0].locale,
                postalCode: singleEvent._embedded.venues[0].postalCode,
                timezone: singleEvent._embedded.venues[0].timezone,
                city: {
                    name: singleEvent._embedded.venues[0].city.name,
                },
                state: {
                    name: singleEvent._embedded.venues[0].state.name,
                    stateCode: singleEvent._embedded.venues[0].state.statusCode,
                },
                country: {
                    name: singleEvent._embedded.venues[0].country.name,
                    countryCode: singleEvent._embedded.venues[0].country.countryCode,
                },
                address: {
                    line1: singleEvent._embedded.venues[0].address.line1,
                },
                location: {
                    longitude: singleEvent._embedded.venues[0].location.longitude,
                    latitude: singleEvent._embedded.venues[0].location.latitude,
                },
                upcomingEvents: {
                    _total: singleEvent._embedded.venues[0].upcomingEvents._total,
                    tmr: singleEvent._embedded.venues[0].upcomingEvents.tmr,
                    ticketmaster: singleEvent._embedded.venues[0].upcomingEvents.ticketmaster,
                    _filtered: singleEvent._embedded.venues[0].upcomingEvents._filtered,
                },
                _links: {
                    self: {
                        href: singleEvent._embedded.venues[0]._links.self.href,
                    },
                },
            },
            ticketURL: singleEvent.outlets[1].url,
        };
        res.status(200).send(eventDetails);
    })
        .catch(function (error) { return console.error(error); });
});
exports.default = eventDetailsRouter;
