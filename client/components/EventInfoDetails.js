"use strict";
exports.__esModule = true;
exports.Main = void 0;
var React = require("react");
var Grid_1 = require("@mui/material/Grid");
var Typography_1 = require("@mui/material/Typography");
var Divider_1 = require("@mui/material/Divider");
var Main = function (props) {
    var description = props.description, title = props.title;
    return (<Grid_1["default"] item xs={12} md={8}>
      <Typography_1["default"] variant='h6' gutterBottom>
        {title}
      </Typography_1["default"]>
      <Divider_1["default"] />
      <Typography_1["default"]>{description}</Typography_1["default"]>
    </Grid_1["default"]>);
};
exports.Main = Main;
