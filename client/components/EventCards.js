"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var styles_1 = require("@mui/material/styles");
var moment_1 = require("moment");
var material_1 = require("../styles/material");
var Img = (0, styles_1.styled)('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
});
var EventCards = function (_a) {
    var events = _a.events;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var date = events.dates.start.dateTime;
    date = (0, moment_1["default"])(date).add(1, 'day').format('MMMM Do YYYY');
    var image = events.images[0].url;
    // console.log(image);
    // if (!image.length) {
    //   image = 'https://source.unsplash.com/random/?music-festival';
    // }
    var id = events.id;
    var name = events.name, url = events.url, info = events.info;
    // useEffect(() => {
    // }, []);
    var getDetails = function (id) {
        navigate("/details/?id=".concat(id));
    };
    return (<material_1.Paper sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: function (theme) {
                return theme.palette.mode === 'dark' ? '#1A2027' : '#fff';
            }
        }}>
      <material_1.Grid container spacing={2}>
        <material_1.Grid item>
          <material_1.ButtonBase onClick={function () {
            getDetails(id);
        }}>
            <material_1.InfoIcon /> More details
          </material_1.ButtonBase>
        </material_1.Grid>
        <material_1.Grid item xs={12} container>
          <material_1.Grid item container direction='column' spacing={2}>
            <material_1.Grid item>
              <Img alt='alt tag' src={image}/>
            </material_1.Grid>
            <material_1.Grid item>
              <material_1.Typography variant='h6'>{name}</material_1.Typography>
            </material_1.Grid>
            <material_1.Grid item>
              <material_1.CalendarMonthIcon />
              {date}
            </material_1.Grid>
            {info ? (<material_1.Grid item>
                <material_1.DescriptionIcon />
                {info}
              </material_1.Grid>) : (<material_1.Grid item>
                <material_1.DescriptionIcon /> No event details
              </material_1.Grid>)}
            <material_1.Grid item>
              <material_1.LocalActivityIcon />
              {url}
            </material_1.Grid>
          </material_1.Grid>
        </material_1.Grid>
      </material_1.Grid>
    </material_1.Paper>);
};
exports["default"] = EventCards;
