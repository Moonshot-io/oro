"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ArtistCards_1 = require("../components/ArtistCards");
var ArtistContext_1 = require("../context/ArtistContext");
var material_1 = require("../styles/material");
var Artists = function () {
    var artistContext = (0, react_1.useContext)(ArtistContext_1.ArtistContext);
    // console.log(artistContext);
    var artistData = artistContext.artistData, getFaveArtists = artistContext.getFaveArtists, setArtistData = artistContext.setArtistData;
    var favorites = artistData;
    (0, react_1.useEffect)(function () {
        getFaveArtists();
    }, []);
    return (<div>
      <div>Hello ARtists</div>
      <material_1.Box sx={{ flexGrow: 1 }}>
        <material_1.Grid container spacing={2}>
          {favorites.map(function (artObj, index) {
            if (!artObj.image.length) {
                var musicImages = ['music', 'band', 'concert', 'music-festival', 'rock-concert', 'musical', 'guitar', 'singer', 'opera'];
                artObj.image = "https://source.unsplash.com/random/?".concat(musicImages[Math.floor(Math.random() * musicImages.length + 1)]);
            }
            return (<material_1.Grid item key={artObj.id} xs={12} sm={4} md={2}>
                <ArtistCards_1["default"] artistProps={artObj} key={artObj.id}/>
              </material_1.Grid>);
        })}
        </material_1.Grid>
      </material_1.Box>
    </div>);
};
exports["default"] = Artists;
