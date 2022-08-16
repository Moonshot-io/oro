"use strict";
exports.__esModule = true;
exports.UserContext = exports.UserContextProvider = void 0;
var react_1 = require("react");
var axios_1 = require("axios");
var moment_1 = require("moment");
var UserContext = react_1["default"].createContext({});
exports.UserContext = UserContext;
var UserContextProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)([]), userEvents = _b[0], setUserEvents = _b[1];
    var getUserEvents = function () {
        axios_1["default"].get('/profile/events')
            .then(function (events) {
            var data = events.data;
            var startDate = data.sales.public.startDateTime;
            var endDate = data.sales.public.endDateTime;
            var eventInfo = {
                eventName: data.name,
                eventDate: data.dates.start.localDate,
                venue: data._embedded.venues[0].name,
                postalCode: data._embedded.venues[0].postalCode,
                city: data._embedded.venues[0].city.name,
                state: data._embedded.venues[0].state.name,
                address: data._embedded.venues[0].address.line1,
                link: data.url,
                saleStart: (0, moment_1["default"])(startDate).format('LLLL'),
                saleEnd: (0, moment_1["default"])(endDate).format('LLLL')
            };
            setUserEvents(eventInfo);
        })["catch"](function (err) {
            console.error(err);
        });
    };
    var appProps = {
        userEvents: userEvents,
        setUserEvents: setUserEvents,
        getUserEvents: getUserEvents
    };
    return (<UserContext.Provider value={appProps}>{children}</UserContext.Provider>);
};
exports.UserContextProvider = UserContextProvider;
