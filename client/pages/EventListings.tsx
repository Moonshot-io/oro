import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCardDetails from '../components/EventCardDetails';
import Dropdown from '../components/Dropdown';
import eventDummy from '../../server/database/data/eventDummy';
import { CssTextField, Grid, SearchIcon, Button, Styled, purple, SortIcon, Tooltip, IconButton, InputAdornment, Box, Typography, UseTheme } from '../styles/material';

const fontColor = {
  style: { color: '#9B27B0' }
};

const ColorButton = Styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const EventListings: React.FC = () => {
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const [ keyword, setKeyword ] = useState('');
  const [events, setEvents] = useState(eventDummy);
  const [allEvents, setAllEvents] = useState(eventDummy);
  const [city, setCity] = useState('any');
  const [eventsExist, setEventsExist] = useState(true);
  const getEvents = () => {
    axios.get('/api/events/list', { params: { keyword } })
      .then((responseObj) => {
        console.log(responseObj.data);
        if(responseObj.data === false){
          setEventsExist(false);
          setEvents([]);
          setAllEvents([]);
        } else {
        console.log(responseObj.data.events);
        setEvents(responseObj.data.events);
        setAllEvents(responseObj.data.events);
        setEventsExist(true);
        }
      })
      .catch((err) => {
        setEventsExist(false);
        setEvents([]);
        setAllEvents([]);
        console.error(err);
      });
  };


  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    updateEvents(city);
  }, [city]);



  const enterClick = (e: { keyCode: number; }) => {
    if (e.keyCode === 13) {
      getEvents();
    }
  };

  const handleChange = (e: { target: HTMLInputElement; }) => {
    setKeyword(e.target.value);
  };

  const handleSort = () => {
    console.log('sort date');
  }

  const updateEvents = (city) => {
    setCity(city);
    if(city === 'all'){
      setEvents(allEvents);
    } else {
    const filteredEvents = allEvents.filter((event) => {
      return event.venueInfo[0].city === city;
    })
    if(!filteredEvents.length){
      setEvents([...allEvents]);
    } else {
      setEvents([...filteredEvents]);
    }
  }
  }

  const inputStyle = {
    style: {
      WebkitBoxShadow: `0 0 0 1000px ${iconColors} inset`,
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px #9B27B0 inset",
      },
      '-webkit-text-fill-color': '#9B27B0',
      color: '#9B27B0',
    }
  };

if(eventsExist){
  return (
    <div className="page-body">
   <Typography
    variant="h2">Search for Events</Typography>
      <br/>
      <Box>
      <Grid container style={{ gap: 15, maxHeight: '50vh' }}  alignItems="left"
  >
      <Grid xs={12} sm={12} md={6}><CssTextField fullWidth  InputLabelProps={fontColor} inputProps={inputStyle}
          sx={{ mb: '15px'}} id="keywordSearch"
          color="secondary" label="search events" type='text'
          onChange={ handleChange } value={keyword} onKeyDown={enterClick}
          InputProps={{endAdornment:
          (
            <InputAdornment position="end">
              <ColorButton onClick={getEvents} sx={{bgColor:purple[500]}}>
              <SearchIcon />
              </ColorButton>
            </InputAdornment>
          )
          }}/>
        </Grid>
        <Grid xs={8} sm={8} md={4}><Dropdown updateEvents={updateEvents} eventList={[...events]} /></Grid>
      </Grid></Box><br/>
      <Grid container spacing={2}>
        {
          events.map((event, index) => (
            <Grid item xs={12} md={6}>
            <EventCardDetails
              event={event}
              key={`event${index}`}
            />
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
      } else {
        return (
          <div className="page-body">
            <Typography
    variant="h2">Search for Events</Typography>
            <br/>
            <Box>
            <Grid container style={{ gap: 15, maxHeight: '50vh' }}  alignItems="left"
        >
            <Grid xs={12} sm={12} md={6}><CssTextField fullWidth  InputLabelProps={fontColor} inputProps={inputStyle}
                sx={{ mb: '15px'}} id="keywordSearch"
                color="secondary" label="search events" type='text'
                onChange={ handleChange } value={keyword} onKeyDown={enterClick}
                InputProps={{endAdornment:
                (
                  <InputAdornment position="end">
                    <ColorButton onClick={getEvents} sx={{bgColor:purple[500]}}>
                    <SearchIcon />
                    </ColorButton>
                  </InputAdornment>
                )
                }}/>
              </Grid>
              <Grid xs={8} sm={8} md={4}><Dropdown updateEvents={updateEvents} eventList={[...events]} /></Grid>
            </Grid></Box><br/>
                <h3>No Events Found</h3>
                <h4>Please try another search.</h4>
          </div>
        );



      }
};

export default EventListings;