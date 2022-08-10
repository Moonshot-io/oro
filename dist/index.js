"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var eventListingsRouter_1 = __importDefault(require("./routes/eventListingsRouter"));
var artists_1 = __importDefault(require("./routes/artists"));
var app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
//ROUTERS------------------------------
app.use('/events', eventListingsRouter_1.default);
app.use('/artists', artists_1.default);
app.get('/*', function (req, res) {
    console.log('catchall');
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
var PORT = 5000;
app.listen(PORT, function () {
    console.log("App listening on port http://localhost:".concat(PORT));
});
