"use strict";
exports.__esModule = true;
var react_1 = require("react");
var UserContext_1 = require("../context/UserContext");
var styles_1 = require("@mui/material/styles");
var material_1 = require("../styles/material");
var Accordion = (0, styles_1.styled)(function (props) { return (<material_1.MuiAccordion children={''} disableGutters elevation={0} square {...props}/>); })(function (_a) {
    var theme = _a.theme;
    return ({
        border: "1px solid ".concat(theme.palette.divider),
        '&:not(:last-child)': {
            borderBottom: 0
        },
        '&:before': {
            display: 'none'
        }
    });
});
var AccordionSummary = (0, styles_1.styled)(function (props) { return (<material_1.MuiAccordionSummary expandIcon={<material_1.ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }}/>} {...props}/>); })(function (_a) {
    var theme = _a.theme;
    return ({
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)'
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1)
        }
    });
});
var AccordionDetails = (0, styles_1.styled)(material_1.MuiAccordionDetails)(function (_a) {
    var theme = _a.theme;
    return ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)'
    });
});
var Profile = function () {
    var _a = (0, react_1.useContext)(UserContext_1.UserContext), userEvents = _a.userEvents, getUserEvents = _a.getUserEvents;
    var _b = react_1["default"].useState('panel1'), expanded = _b[0], setExpanded = _b[1];
    var handleChange = function (panel) { return function (event, newExpanded) {
        setExpanded(newExpanded ? panel : false);
    }; };
    (0, react_1.useEffect)(function () {
        getUserEvents();
    }, []);
    return (<div>
      <div>Hello Profile</div>
      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <material_1.Typography>{userEvents.eventName}</material_1.Typography>
            <material_1.Typography>{userEvents.eventDate}</material_1.Typography>
          </AccordionSummary>
          <AccordionDetails>
            <material_1.List>
              <material_1.ListItem>Venue: {userEvents.venue}</material_1.ListItem>
              <material_1.ListItem>
                Location: {userEvents.address}, {userEvents.city}, {userEvents.state}, {userEvents.postalCode}
              </material_1.ListItem>
              <material_1.ListItem>Ticket sale starts: {userEvents.saleStart}</material_1.ListItem>
              <material_1.ListItem>Ticket sale ends: {userEvents.saleEnd}</material_1.ListItem>
              <material_1.Button onClick={function () { location.href = userEvents.link; }}>Purchase Tickets</material_1.Button>
            </material_1.List>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>);
};
exports["default"] = Profile;
