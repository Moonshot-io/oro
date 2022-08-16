"use strict";
exports.__esModule = true;
var path_1 = require("path");
var express_1 = require("express");
var eventListingsRouter_1 = require("./routes/eventListingsRouter");
var artistsRouter_1 = require("./routes/artistsRouter");
var songFinder_1 = require("./routes/songFinder");
var eventDetail_1 = require("./routes/eventDetail");
var auth_1 = require("./routes/auth");
var profile_1 = require("./routes/profile");
console.log('index server');
var app = (0, express_1["default"])();
app.use(express_1["default"].json({ limit: '50mb' }));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].static(path_1["default"].join(__dirname, '../public')));
//ROUTERS------------------------------
app.use('/events', eventListingsRouter_1["default"]);
app.use('/favArtists', artistsRouter_1["default"]);
app.use('/songs', songFinder_1["default"]);
app.use('/eventDetails', eventDetail_1["default"]);
app.use('/auth', auth_1["default"]);
app.use('/profile', profile_1["default"]);
app.get('/*', function (req, res) {
    res.sendFile(path_1["default"].join(__dirname, '../public/index.html'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
var PORT = 5000;
app.listen(PORT, function () {
    console.log("App listening on port http://localhost:".concat(PORT));
});
