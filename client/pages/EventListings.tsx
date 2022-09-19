import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import EventCardDetails from '../components/EventCardDetails';
import Dropdown from '../components/Dropdown';
import Login from './Login';
import eventDummy from '../../server/database/data/eventDummy';
import { UserContext } from '../context/UserContext';
import { CssTextField, Grid, SearchIcon, InputAdornment, Box, Typography, UseTheme, ColorButton } from '../styles/material';

const fontColor = {
  style: { color: '#a352ff' }
};

const EventListings: React.FC = () => {
  const { currentUserInfo } = useContext(UserContext);
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const themeBGColor = theme.palette.primary.main;

  const [ keyword, setKeyword ] = useState('');
  const [events, setEvents] = useState(eventDummy);
  const [allEvents, setAllEvents] = useState(eventDummy);
  const [city, setCity] = useState('any');
  const [eventsExist, setEventsExist] = useState(true);
  const getEvents = () => {
    axios.get('/api/events/list', { params: { keyword } })
      .then((responseObj) => {
        if(responseObj.data === false){
          setEventsExist(false);
          setEvents([]);
          setAllEvents([]);
        } else {
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

  const inputstyle = {
    style: {
      WebkitBoxShadow: `0 0 0 1000px ${themeBGColor} inset`,
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px #a352ff inset",
      },
      '-webkit-text-fill-color': '#a352ff',
      color: '#a352ff',
    }
  };

  if (currentUserInfo?.id === '') {
    return (
      <div className="page-body">
        <Login/>
      </div>
    );
  }

else if(eventsExist){
  return (
    <div className="page-body">
   <Typography
    variant="h2">Search for Events</Typography>
      <br/>
      <Box>
      <Grid container style={{ gap: 15, maxHeight: '50vh' }}  alignItems="left"
  >
      <Grid xs={12} sm={12} md={6}><CssTextField fullWidth
      size='small' InputLabelProps={fontColor} inputProps={inputstyle}
          sx={{ mb: '15px', pr: '5px'}} id="keywordSearch"
          color="secondary" label="search events" type='text'
          onChange={ handleChange } value={keyword} onKeyDown={enterClick}
          InputProps={{endAdornment:
          (
            <InputAdornment position="end">
              <ColorButton onClick={getEvents} sx={{bgColor:'#a352ff'}}>
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
            <Grid xs={12} sm={12} md={6}><CssTextField fullWidth  InputLabelProps={fontColor} inputProps={inputstyle}
                sx={{ mb: '15px'}} id="keywordSearch"
                color="secondary" label="search events" type='text'
                onChange={ handleChange } value={keyword} onKeyDown={enterClick}
                InputProps={{endAdornment:
                (
                  <InputAdornment position="end">
                    <ColorButton onClick={getEvents} sx={{bgColor:'#a352ff'}}>
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