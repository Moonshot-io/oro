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
exports.__esModule = true;
var react_1 = require("react");
var mic_recorder_to_mp3_1 = require("mic-recorder-to-mp3");
var axios_1 = require("axios");
var material_1 = require("@mui/material");
var ExpandMore_1 = require("@mui/icons-material/ExpandMore");
var icons_material_1 = require("@mui/icons-material");
window.oncontextmenu = function (event) {
    // eslint-disable-next-line no-console
    // console.log(event); // prints [object PointerEvent]
    var pointerEvent = event;
    // eslint-disable-next-line no-console
    // console.log(`window.oncontextmenu: ${pointerEvent.pointerType}`);
    if (pointerEvent.pointerType === 'touch') {
        // context menu was triggerd by long press
        return false;
    }
    // just to show that pointerEvent.pointerType has another value 'mouse' aka right click
    if (pointerEvent.pointerType === 'mouse') {
        // context menu was triggered by right click
        return true;
    }
    // returning true will show a context menu for other cases
    return true;
};
var Mp3Recorder = new mic_recorder_to_mp3_1["default"]({ bitRate: 128 });
var SongFinder = function () {
    // const [isRecording, setIsRecording] = useState(false);
    var _a = (0, react_1.useState)(false), isBlocked = _a[0], setIsBlocked = _a[1];
    var _b = (0, react_1.useState)(), previewSource = _b[0], setPreviewSource = _b[1];
    var _c = (0, react_1.useState)(''), song = _c[0], setSong = _c[1];
    var _d = (0, react_1.useState)(''), artist = _d[0], setArtist = _d[1];
    // const [artistImage, setArtistImage] = useState('');
    var _e = (0, react_1.useState)(''), albumTitle = _e[0], setAlbumTitle = _e[1];
    var _f = (0, react_1.useState)(''), albumImage = _f[0], setAlbumImage = _f[1];
    var _g = (0, react_1.useState)(false), favorited = _g[0], setFavorited = _g[1];
    var _h = (0, react_1.useState)([]), lyrics = _h[0], setLyrics = _h[1];
    // const [deleteToken, setDeleteToken] = useState('');
    (0, react_1.useEffect)(function () {
        navigator.mediaDevices.getUserMedia({ audio: true }, function () {
            // console.log('Permission Granted');
            setIsBlocked(true);
        }, function () {
            // console.log("Permission Denied");
            setIsBlocked(false);
        });
    }, []);
    (0, react_1.useEffect)(function () {
        if (song && artist) {
            axios_1["default"].get('/songs', {
                params: {
                    artistName: artist,
                    song: song
                }
            })
                .then(function (results) {
                // console.log(results.data)
                setLyrics(results.data);
            })["catch"](function (err) { return console.error(err); });
        }
    }, [artist, song]);
    (0, react_1.useEffect)(function () {
        if (artist) {
            axios_1["default"].get('/favArtists/artist', {
                params: {
                    artistName: artist
                }
            })
                .then(function (results) {
                // console.log(results.data);
                // console.log(results.data);
                if (results.data.length) {
                    setFavorited(true);
                }
                else {
                    setFavorited(false);
                }
            })["catch"](function (err) { return console.error(err); });
        }
    }, [artist]);
    (0, react_1.useEffect)(function () {
        if (previewSource) {
            axios_1["default"].post('/songs', {
                data: previewSource
            })
                .then(function (results) {
                // console.log(results);
                setSong(results.data.title);
                setArtist(results.data.apple_music.artistName);
                setAlbumTitle(results.data.apple_music.albumName);
                setAlbumImage(results.data.spotify.album.images[0].url);
                // console.log(results.data.spotify.album.images);
                // console.log(results.data);
                // axios.delete('/songs', {
                //   data: {
                //     delete_token: results.data.delete_token;
                //   }
                // })
                // console.log('SUCCESS', results);
            })["catch"](function (err) { return console.error(err); });
        }
    }, [previewSource]);
    var start = function () {
        if (isBlocked) {
            // console.log('Permission Denied');
        }
        else {
            Mp3Recorder.start()["catch"](function (e) { return console.error(e); });
        }
    };
    var stop = function () {
        Mp3Recorder.stop().getMp3()
            .then(function (_a) {
            var buffer = _a[0], blob = _a[1];
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    setPreviewSource(reader.result);
                    return [2 /*return*/];
                });
            }); };
            // setSong('');
            setArtist('');
            setAlbumTitle('');
            setAlbumImage('');
            setLyrics([]);
        })["catch"](function (e) { return console.log(e); });
    };
    var getLyrics = function () {
        if (lyrics && Array.isArray(lyrics)) {
            return lyrics.map(function (line, index) {
                return (<div key={index + 1}>
            {line + '\n'}
          </div>);
            });
        }
        else {
            return null;
        }
    };
    var addToFavorites = function () {
        // console.log(artist);
        axios_1["default"].post('/favArtists', {
            artistName: artist
        })
            .then(function (data) {
            setFavorited(true);
            // console.log('success', data)
        })["catch"](function (err) { return console.error(err); });
    };
    var removeFavorites = function () {
        axios_1["default"]["delete"]('/favArtists', {
            data: {
                artistName: artist
            }
        })
            .then(function () {
            // console.log('removed')
            setFavorited(false);
        })["catch"](function (err) { return console.error(err); });
    };
    var favoriteButton = function () {
        if (artist && favorited === true) {
            return (<div>
          <material_1.Button variant='contained' size='small' onClick={removeFavorites}>{<icons_material_1.RemoveCircleOutline></icons_material_1.RemoveCircleOutline>} remove from favorites</material_1.Button>
        </div>);
        }
        else if (artist && favorited === false) {
            return (<div>
          <material_1.Button variant='contained' size='small' onClick={addToFavorites}>{<icons_material_1.Star></icons_material_1.Star>} add to favorites</material_1.Button>
        </div>);
        }
    };
    return (<div>
      <div>Hello SongFinder</div>

      <div>
        <material_1.Grid container>
          <material_1.Grid item xs={0} md={4}></material_1.Grid>
          <material_1.Grid item xs={12} md={4}>
            <material_1.Accordion expanded={true}>
              <material_1.AccordionSummary>{<icons_material_1.MusicNote></icons_material_1.MusicNote>} Song Name
              </material_1.AccordionSummary>
              <material_1.AccordionDetails>
                {song}
              </material_1.AccordionDetails>
            </material_1.Accordion>

            <material_1.Accordion>
              <material_1.AccordionSummary expandIcon={<ExpandMore_1["default"] />}>{<icons_material_1.Person></icons_material_1.Person>} Artist
              </material_1.AccordionSummary>
              <material_1.AccordionDetails>
                <div>
                  <div id='artistName'>
                    {artist}
                  </div>

                  <div id='favoriteButton'>
                    {favoriteButton()}
                  </div>
                </div>
              </material_1.AccordionDetails>
            </material_1.Accordion>

            <material_1.Accordion>
              <material_1.AccordionSummary expandIcon={<ExpandMore_1["default"] />}>{<icons_material_1.Lyrics></icons_material_1.Lyrics>} Lyrics
              </material_1.AccordionSummary>
              <material_1.AccordionDetails>
                <div id='lyrics'>
                  {getLyrics()}
                </div>
              </material_1.AccordionDetails>
            </material_1.Accordion>

            <material_1.Accordion>
              <material_1.AccordionSummary expandIcon={<ExpandMore_1["default"] />}>{<icons_material_1.LibraryMusic></icons_material_1.LibraryMusic>} Album
              </material_1.AccordionSummary>
              <material_1.AccordionDetails>
                <div>
                  {albumTitle}
                </div>
                <img height='100px' width='auto' src={albumImage}/>
              </material_1.AccordionDetails>
            </material_1.Accordion>
          </material_1.Grid>
          {/* <Grid item xs = {4}></Grid> */}
        </material_1.Grid>
      </div>

      <div style={{ marginTop: '10px' }}>
        <material_1.Fab variant='circular' onMouseDown={start} onMouseUp={stop}><icons_material_1.MusicNote></icons_material_1.MusicNote></material_1.Fab>
      </div>
    </div>);
};
exports["default"] = SongFinder;
