"use strict";
exports.__esModule = true;
var express_1 = require("express");
var artistsRouter = (0, express_1.Router)();
artistsRouter.get('/', function (req, res) {
    console.log('get artists-----');
});
exports["default"] = artistsRouter;
