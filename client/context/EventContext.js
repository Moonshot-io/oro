"use strict";
exports.__esModule = true;
exports.EventContext = exports.EventContextProvider = void 0;
var axios_1 = require("axios");
var react_1 = require("react");
var EventContext = react_1["default"].createContext({});
exports.EventContext = EventContext;
var EventContextProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(), eventDetails = _b[0], setEventDetails = _b[1];
    var _c = (0, react_1.useState)(''), eventId = _c[0], setEventId = _c[1];
    var getEventDetails = function (id) {
        axios_1["default"]
            .get('/eventDetails', { params: { id: id } })
            .then(function (_a) {
            var data = _a.data;
            setEventDetails(data);
        })["catch"](function (err) { return console.error(err); });
        return eventDetails;
    };
    var appProps = {
        eventDetails: eventDetails,
        setEventDetails: setEventDetails,
        getEventDetails: getEventDetails,
        eventId: eventId,
        setEventId: setEventId
    };
    return (<EventContext.Provider value={appProps}>{children}</EventContext.Provider>);
};
exports.EventContextProvider = EventContextProvider;
