"use strict";
exports.__esModule = true;
var React = require("react");
var Accordion_1 = require("@mui/material/Accordion");
var AccordionDetails_1 = require("@mui/material/AccordionDetails");
var AccordionSummary_1 = require("@mui/material/AccordionSummary");
var Typography_1 = require("@mui/material/Typography");
var ExpandMore_1 = require("@mui/icons-material/ExpandMore");
var EventCards_1 = require("./EventCards");
function AccordionCard(props) {
    var _a = props.artistProps, artist = _a.artist, favArtist = _a.favArtist, getFaveArtists = _a.getFaveArtists;
    // console.log(artist);
    var artistName = artist.artistName;
    var _b = React.useState(false), expanded = _b[0], setExpanded = _b[1];
    var handleChange = function (panel) { return function (event, isExpanded) {
        setExpanded(isExpanded ? panel : false);
    }; };
    return (<div>
      <Accordion_1["default"] expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary_1["default"] expandIcon={<ExpandMore_1["default"] />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography_1["default"] sx={{ width: '33%', flexShrink: 0 }}>
            {artistName}
          </Typography_1["default"]>
        </AccordionSummary_1["default"]>
        <AccordionDetails_1["default"]>
          <Typography_1["default"]>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography_1["default"]>
        </AccordionDetails_1["default"]>
      </Accordion_1["default"]>
      <Accordion_1["default"] expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary_1["default"] expandIcon={<ExpandMore_1["default"] />} aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography_1["default"] sx={{ width: '33%', flexShrink: 0 }}>Artist Bio</Typography_1["default"]>
        </AccordionSummary_1["default"]>
        <AccordionDetails_1["default"]>
          <Typography_1["default"]>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography_1["default"]>
        </AccordionDetails_1["default"]>
      </Accordion_1["default"]>
      <Accordion_1["default"] expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary_1["default"] expandIcon={<ExpandMore_1["default"] />} aria-controls="panel3bh-content" id="panel3bh-header">
          <Typography_1["default"] sx={{ width: '33%', flexShrink: 0 }}>
            Upcoming Events
          </Typography_1["default"]>
        </AccordionSummary_1["default"]>
        <AccordionDetails_1["default"]>
          <Typography_1["default"]>
            <EventCards_1["default"] />
          </Typography_1["default"]>
        </AccordionDetails_1["default"]>
      </Accordion_1["default"]>
    </div>);
}
exports["default"] = AccordionCard;
