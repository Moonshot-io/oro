"use strict";
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
var styles_1 = require("@mui/material/styles");
var EventCardDetails_1 = require("../components/EventCardDetails");
var TextField_1 = require("@mui/material/TextField");
var eventDummy_1 = require("../../server/database/data/eventDummy");
var CssTextField = (0, styles_1.styled)(TextField_1["default"])({
    '& label.Mui-focused': {
        color: '#9B27B0'
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#9B27B0'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#1A76D2'
        },
        '&:hover fieldset': {
            borderColor: '#BDBDBD'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#9B27B0'
        }
    }
});
var fontColor = {
    style: { color: '#9B27B0' }
};
var EventListings = function () {
    var _a = (0, react_1.useState)(''), keyword = _a[0], setKeyword = _a[1];
    var _b = (0, react_1.useState)(eventDummy_1["default"]), events = _b[0], setEvents = _b[1];
    var getEvents = function () {
        axios_1["default"].get('/events/list', { params: { keyword: keyword } })
            .then(function (responseObj) {
            setEvents(responseObj.data.events);
        })["catch"](function (err) { return console.error(err); });
    };
    (0, react_1.useEffect)(function () {
        getEvents();
        console.log(keyword);
        console.log('EVENTS', events);
    }, []);
    var enterClick = function (e) {
        if (e.keyCode === 13) {
            getEvents();
        }
    };
    var handleChange = function (e) {
        setKeyword(e.target.value);
    };
    return (<div>
      <br />
      <div>
        <CssTextField InputLabelProps={fontColor} inputProps={fontColor} id="keywordSearch" color="secondary" label="search events" type='text' onChange={handleChange} value={keyword} onKeyDown={enterClick}/>
      </div><br />
      <div>
        {events.map(function (event) { return (<EventCardDetails_1["default"] events={events} event={event} key={event.eventId}/>); })}
      </div>
    </div>);
};
exports["default"] = EventListings;
