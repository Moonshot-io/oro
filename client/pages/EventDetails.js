"use strict";
exports.__esModule = true;
var react_1 = require("react");
var EventContext_1 = require("../context/EventContext");
var Grid_1 = require("@mui/material/Grid");
var Container_1 = require("@mui/material/Container");
// import GitHubIcon from '@mui/icons-material/GitHub';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
var styles_1 = require("@mui/material/styles");
// import Header from './Header';
var MainFeaturedPost_1 = require("../components/MainFeaturedPost");
var react_router_dom_1 = require("react-router-dom");
// import Sidebar from './Sidebar';
// import Footer from './Footer';
var EventDetails = function () {
    var _a = (0, react_router_dom_1.useSearchParams)(), searchParams = _a[0], setSearchParams = _a[1];
    var _b = (0, react_1.useContext)(EventContext_1.EventContext), getEventDetails = _b.getEventDetails, eventDetails = _b.eventDetails;
    var idEvent = searchParams.get('id');
    // console.log('THIS IS THE ID', idEvent);
    (0, react_1.useEffect)(function () {
        if (idEvent !== null) {
            getEventDetails(idEvent);
        }
    }, []);
    // const eventDetails = getEventDetails('Z7r9jZ1AdFYep');
    // console.log('EVENT DATA!!!!!', eventDetails);
    var mainFeaturedPost = {
        title: eventDetails === null || eventDetails === void 0 ? void 0 : eventDetails.name,
        description: "".concat(eventDetails === null || eventDetails === void 0 ? void 0 : eventDetails.venues.name, "... ").concat(eventDetails === null || eventDetails === void 0 ? void 0 : eventDetails.venues.city.name, ", ").concat(eventDetails === null || eventDetails === void 0 ? void 0 : eventDetails.venues.state.name),
        image: eventDetails === null || eventDetails === void 0 ? void 0 : eventDetails.image
    };
    var theme = (0, styles_1.createTheme)();
    return (<Container_1["default"] maxWidth='lg'>
      <main>
        <MainFeaturedPost_1["default"] post={mainFeaturedPost}/>
        <Grid_1["default"] container spacing={5} sx={{ mt: 3 }}></Grid_1["default"]>
      </main>
    </Container_1["default"]>);
};
exports["default"] = EventDetails;
