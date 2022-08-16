"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("@mui/material/styles");
var IconButton_1 = require("@mui/material/IconButton");
var material_1 = require("../styles/material");
var EventCards_1 = require("./EventCards");
var axios_1 = require("axios");
var ExpandMore = (0, styles_1.styled)(function (props) {
    var expand = props.expand, other = __rest(props, ["expand"]);
    return <IconButton_1["default"] {...other}/>;
})(function (_a) {
    var theme = _a.theme, expand = _a.expand;
    return ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    });
});
var ArtistInfoCard = function (_a) {
    var artistProps = _a.artistProps;
    // console.log(artistProps);
    var _b = react_1["default"].useState(false), expanded = _b[0], setExpanded = _b[1];
    var _c = (0, react_1.useState)([{
            name: 'No events found',
            image: '/images/patrick-perkins-pay-artists.jpg',
            description: 'There are currently no events found for this artist.',
            id: 1001
        }]), events = _c[0], setEvents = _c[1];
    var artistName = artistProps.artistName, bio = artistProps.bio, facebook = artistProps.facebook, homepage = artistProps.homepage, image = artistProps.image, instagram = artistProps.instagram, itunes = artistProps.itunes, twitter = artistProps.twitter, wiki = artistProps.wiki, youtube = artistProps.youtube;
    // console.log(image);
    // if (!image.length) {
    //   image = 'https://source.unsplash.com/random/?music-festival';
    // }
    var socials = {
        youtube: [youtube, <material_1.YouTubeIcon key={youtube}/>],
        twitter: [twitter, <material_1.TwitterIcon key={twitter}/>],
        facebook: [facebook, <material_1.FacebookIcon key={facebook}/>],
        instagram: [instagram, <material_1.InstagramIcon key={instagram}/>],
        homepage: [homepage, <material_1.LanguageIcon key={homepage}/>],
        itunes: [itunes, <material_1.MusicNoteIcon key={itunes}/>],
        wiki: [wiki, <material_1.QuizIcon key={wiki}/>]
    };
    // console.log(artist);
    var handleExpandClick = function () {
        setExpanded(!expanded);
    };
    var getArtistEvents = function (artist) {
        var noSpecialChars = artist
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        axios_1["default"].get('/favArtists/events', { params: { keyword: noSpecialChars } })
            .then(function (responseObj) {
            // console.log(responseObj.data.events);
            setEvents(responseObj.data.events);
        })
            .then(function () {
            // console.log(events);
        })["catch"](function (err) { return console.error(err); });
        // console.log(events);
    };
    return (<material_1.Card>
      <material_1.CardHeader title={artistName}/>
      <material_1.CardMedia component="img" height="194" image={image} alt={artistName}/>
      <material_1.CardContent>
        <material_1.Typography noWrap variant="body2" color="text.secondary">
          {bio}
        </material_1.Typography>
      </material_1.CardContent>
      <material_1.CardActions disableSpacing>
        <IconButton_1["default"] aria-label="add to favorites">
          <material_1.FavoriteIcon />
        </IconButton_1["default"]>
        <ExpandMore expand={expanded} onClick={function () {
            handleExpandClick();
            getArtistEvents(artistName);
        }} aria-expanded={expanded} aria-label="show more">
          <material_1.ExpandMoreIcon />
        </ExpandMore>
      </material_1.CardActions>
      <material_1.Collapse in={expanded} timeout="auto" unmountOnExit>
        <material_1.CardContent id={artistName}>
          <material_1.Typography paragraph>Bio:</material_1.Typography>
          <material_1.Typography paragraph>
            {bio}
          </material_1.Typography>
          <material_1.Typography paragraph>Socials:</material_1.Typography>
          <material_1.Typography paragraph>
            <material_1.Box sx={{ flexGrow: 1 }}>
              <material_1.Grid container spacing={2}>
                {Object.keys(socials).map(function (social) {
            return (<material_1.Grid item key={social}>
                      <material_1.Item>
                        <a href={socials[social][0]}>{socials[social][1]}</a>
                      </material_1.Item>
                    </material_1.Grid>);
        })}
              </material_1.Grid>
            </material_1.Box>
          </material_1.Typography>
          <material_1.Box sx={{ flexGrow: 1 }}>
            <material_1.Grid container spacing={2}>
              {events.length > 1
            ? <material_1.Grid item id={artistName}>
                    <material_1.Typography paragraph>Events:</material_1.Typography>
                    {events.map(function (eventObj) {
                    return <EventCards_1["default"] events={eventObj} key={eventObj.id}/>;
                })}
                  </material_1.Grid>
            : <material_1.Typography paragraph>No Upcoming Events</material_1.Typography>}
            </material_1.Grid>
          </material_1.Box>
        </material_1.CardContent>
      </material_1.Collapse>
    </material_1.Card>);
};
exports["default"] = ArtistInfoCard;
