"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("@mui/material/styles");
var react_router_dom_1 = require("react-router-dom");
var moment_1 = require("moment");
var Grid_1 = require("@mui/material/Grid");
var Paper_1 = require("@mui/material/Paper");
var material_1 = require("../styles/material");
var Typography_1 = require("@mui/material/Typography");
var ButtonBase_1 = require("@mui/material/ButtonBase");
var PushPin_1 = require("@mui/icons-material/PushPin");
var axios_1 = require("axios");
var Img = (0, styles_1.styled)('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
});
var EventCardDetails = function (_a) {
    var events = _a.events, event = _a.event;
    (0, react_1.useEffect)(function () {
        getPins();
    }, []);
    var getPins = function () {
        axios_1["default"].get('/events/list/pins')
            .then(function (responseObj) {
            setPins(responseObj.data.map(function (event) { return event.eventAPIid; }));
        })["catch"](function (err) { return console.error('GET PINS', err); });
    };
    var _b = (0, react_1.useState)(['foo', 'bar']), pins = _b[0], setPins = _b[1];
    var postEvent = function () {
        axios_1["default"].post('/events/list/pins', {
            userId: 1,
            eventAPIid: event.eventId
        })
            .then(function (response) {
            console.log('POST SUCCESS', response);
        })
            .then(getPins)["catch"](function (err) { return console.error('POST ERROR', err); });
    };
    var deleteEvent = function () {
        axios_1["default"]["delete"]('/events/list/pins', { data: { eventAPIid: event.eventId } })
            .then(function () {
            console.log('DELETE SUCCESS');
            getPins();
        })["catch"](function (err) { return console.error('axios delete error', err); });
    };
    var handleClick = function () {
        if (pins.includes(event.eventId)) {
            return deleteEvent();
        }
        else if (pins == ['foo', 'bar']) {
            setPins(event.eventId);
            return postEvent();
        }
        else if (!pins.includes(event.eventId)) {
            return postEvent();
        }
    };
    var navigate = (0, react_router_dom_1.useNavigate)();
    var date = event.eventDate;
    date = (0, moment_1["default"])(date).add(1, 'day').format('MMMM Do YYYY');
    var image = event.artistInfo[0].artistImages[0].url;
    var getDetails = function () {
        console.log('navigate', event.eventId);
        navigate("/details/?id=".concat(event.eventId));
    };
    return (<div>
      <Paper_1["default"] sx={{
            p: 2,
            margin: 'auto auto 10px auto',
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: function (theme) {
                return theme.palette.mode === 'dark' ? '#1A2027' : '#fff';
            }
        }}>

        <Grid_1["default"] container spacing={4} alignItems='center'>
          <Grid_1["default"] item>
            <ButtonBase_1["default"] sx={{ width: 128, height: 128 }} onClick={function () { return getDetails(); }}>
              <material_1.InfoIcon />
              <Img alt="alt tag" src={image}/>
            </ButtonBase_1["default"]>
          </Grid_1["default"]>
          <Grid_1["default"] item xs={12} sm container>
            <Grid_1["default"] item xs container direction="column" spacing={2}>
              <Grid_1["default"] item xs>
                <Typography_1["default"] variant="body2" gutterBottom>
                  {event.eventName}
                  {event.artistInfo.map(function (artist) { return (<div>
                      {artist.artistName}
                    </div>); })}
                  {date}
                  <br />
                  {event.venueInfo.map(function (venue) { return (<div>
                      {Object.values(venue.address)}
                      <br />
                      {venue.city}, {venue.state} {venue.postalCode}
                    </div>); })}
                </Typography_1["default"]>
              </Grid_1["default"]>
            </Grid_1["default"]>
            <Grid_1["default"] item>
              <PushPin_1["default"] id={event.eventId} color={pins.includes(event.eventId) ? 'secondary' : 'action'} onClick={handleClick}/>
            </Grid_1["default"]>
          </Grid_1["default"]>
        </Grid_1["default"]>
      </Paper_1["default"]>
    </div>);
};
exports["default"] = EventCardDetails;
