"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var axios_1 = __importDefault(require("axios"));
var artistsRouter = (0, express_1.Router)();
var db_1 = __importDefault(require("../database/db"));
artistsRouter.get('/events', function (req, res) {
    var keyword = req.query.keyword;
    // console.log(keyword);
    axios_1.default.get("https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=".concat(keyword, "&apikey=").concat(process.env.TICKETMASTER_API_KEY))
        .then(function (responseObj) {
        // console.log('responseObj 22:', responseObj);
        // const events = responseObj.data._embedded.events.filter((event) => {
        //   const date = new Date();
        //   date.setMonth(date.getMonth() + 6);
        //   console.log(date);
        //   if (event.dates.start.dateTime <= date) {
        //     return event;
        //   }
        // });
        // console.log(events);
        res.status(200).send(responseObj.data._embedded);
    })
        .catch(function (err) { return console.error(err); });
});
artistsRouter.get('/', function (req, res) {
    db_1.default.artistFollowing.findMany()
        .then(function (artistData) {
        // console.info(artistData);
        res.status(200).send(artistData);
    })
        .catch(function (err) {
        // console.error(err);
        res.status(500);
        res.end();
    });
    artistsRouter.post('/', function (req, res) {
        var artistName = req.body.artistName;
        var obj = {
            userId: 1,
            artistName: artistName,
            bio: '',
            ticketId: '',
            youtube: '',
            twitter: '',
            facebook: '',
            instagram: '',
            itunes: '',
            wiki: '',
            homepage: '',
            image: ''
        };
        axios_1.default.get("https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=".concat(artistName, "&api_key=").concat(process.env.LASTFM_API_KEY, "&format=json"))
            .then(function (artistData) {
            obj.bio = artistData.data.artist.bio.summary;
            // console.info(artistData.data.artist.bio.summary);
            axios_1.default.get("https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=".concat(process.env.TICKETMASTER_API_KEY, "&keyword=").concat(artistName))
                .then(function (attractionData) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            obj.ticketId = attractionData.data._embedded.attractions[0].id;
                            obj.youtube = attractionData.data._embedded.attractions[0].externalLinks.youtube[0].url;
                            obj.twitter = attractionData.data._embedded.attractions[0].externalLinks.twitter[0].url;
                            obj.facebook = attractionData.data._embedded.attractions[0].externalLinks.facebook[0].url;
                            obj.instagram = attractionData.data._embedded.attractions[0].externalLinks.instagram[0].url;
                            obj.itunes = attractionData.data._embedded.attractions[0].externalLinks.itunes[0].url;
                            obj.wiki = attractionData.data._embedded.attractions[0].externalLinks.wiki[0].url;
                            obj.homepage = attractionData.data._embedded.attractions[0].externalLinks.homepage[0].url;
                            obj.image = attractionData.data._embedded.attractions[0].images[0].url;
                            // console.info(obj);
                            return [4 /*yield*/, db_1.default.artistFollowing.create({
                                    data: obj
                                })
                                    .then(function (data) {
                                    // console.log(data);
                                    res.status(200).send(data);
                                })
                                    .catch(function (err) { return res.sendStatus(500); })];
                        case 1:
                            // console.info(obj);
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })
                .catch(function (err) {
                console.error(err);
                res.status(500);
                res.end();
            });
            // res.status(200).send(artistData.data.artist.bio);
        })
            .catch(function (err) {
            console.error(err);
            res.status(500);
            res.end();
        });
    });
    // axios.get(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=SptQUng7VWQQ0BVM0uspyhpoyHGkNSq4&keyword=${artistName}`)
    //   .then((artistData) => {
    //     console.info(artistData);
    //     res.status(200).send(artistData.data._embedded);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     res.status(500);
    //     res.end();
    //   });
});
exports.default = artistsRouter;
