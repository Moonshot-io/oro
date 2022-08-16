"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Profile_1 = require("../pages/Profile");
var Home_1 = require("../pages/Home");
var Notifications_1 = require("../pages/Notifications");
var EventListings_1 = require("../pages/EventListings");
var SongFinder_1 = require("../pages/SongFinder");
var Artists_1 = require("../pages/Artists");
var Login_1 = require("../pages/Login");
var ArtistContext_1 = require("../context/ArtistContext");
var EventContext_1 = require("../context/EventContext");
var UserContext_1 = require("../context/UserContext");
var EventDetails_1 = require("../pages/EventDetails");
var Navbar_1 = require("../components/Navbar");
var styles_1 = require("@mui/material/styles");
var themeDark = (0, styles_1.createTheme)({
    palette: {
        background: {
            "default": '#1A2027'
        },
        text: {
            primary: '#1A2027'
        }
    }
});
var App = function () {
    // update React.FC, .FC deprecated?
    return (<styles_1.ThemeProvider theme={themeDark}>
      <EventContext_1.EventContextProvider>
        <UserContext_1.UserContextProvider>
          <ArtistContext_1.ArtistContextProvider>
            <div>
              <header>
                <Navbar_1["default"] />
              </header>
              <react_router_dom_1.Routes>
                <react_router_dom_1.Route path='/home' element={<Home_1["default"] />}/>
                <react_router_dom_1.Route path='/profile' element={<Profile_1["default"] />}/>
                <react_router_dom_1.Route path='/notifications' element={<Notifications_1["default"] />}/>
                <react_router_dom_1.Route path='/eventListings' element={<EventListings_1["default"] />}/>
                <react_router_dom_1.Route path='/songFinder' element={<SongFinder_1["default"] />}/>
                <react_router_dom_1.Route path='/artists' element={<Artists_1["default"] />}/>
                <react_router_dom_1.Route path='/details' element={<EventDetails_1["default"] />}/>
                <react_router_dom_1.Route path='/login' element={<Login_1["default"] />}/>
              </react_router_dom_1.Routes>
            </div>
          </ArtistContext_1.ArtistContextProvider>
        </UserContext_1.UserContextProvider>
      </EventContext_1.EventContextProvider>
    </styles_1.ThemeProvider>);
};
exports["default"] = App;
// <Link to='/eventDetails'>Event Details</Link>
