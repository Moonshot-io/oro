"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
var material_1 = require("../styles/material");
var react_router_dom_1 = require("react-router-dom");
function Menu() {
    var _a = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    }), state = _a[0], setState = _a[1];
    var toggleDrawer = function (anchor, open) { return function (event) {
        var _a;
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(__assign(__assign({}, state), (_a = {}, _a[anchor] = open, _a)));
    }; };
    var list = function (anchor) { return (<material_1.Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
      <material_1.List>
        {[<react_router_dom_1.Link to='/profile'>My Account</react_router_dom_1.Link>, <react_router_dom_1.Link to='/notifications'>Notifications</react_router_dom_1.Link>, <react_router_dom_1.Link to='/eventListings'>Find Events</react_router_dom_1.Link>, <react_router_dom_1.Link to='/songFinder'>Song Finder</react_router_dom_1.Link>, <react_router_dom_1.Link to='/artists'>Artists</react_router_dom_1.Link>].map(function (text, index) { return (<material_1.ListItem key={text} disablePadding>
            <material_1.ListItemButton>
              <material_1.ListItemIcon>
                {index % 2 === 0 ? <material_1.InboxIcon /> : <material_1.MailIcon />}
              </material_1.ListItemIcon>
              <material_1.ListItemText primary={text}/>
            </material_1.ListItemButton>
          </material_1.ListItem>); })}
      </material_1.List>
    </material_1.Box>); };
    return (<div>
      {['right'].map(function (anchor) { return (<React.Fragment key={anchor}>
          <material_1.Button onClick={toggleDrawer(anchor, true)}>{anchor}</material_1.Button>
          <material_1.Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </material_1.Drawer>
        </React.Fragment>); })}
    </div>);
}
exports["default"] = Menu;
