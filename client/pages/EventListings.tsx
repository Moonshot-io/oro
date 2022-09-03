import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCardDetails from '../components/EventCardDetails';
import eventDummy from '../../server/database/data/eventDummy';
import { CssTextField, Grid, SearchIcon, Button, Styled, purple, Grid } from '../styles/material';

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

  const [ keyword, setKeyword ] = useState('');
  const [events, setEvents] = useState(eventDummy);

  const getEvents = () => {
    axios.get('/api/events/list', { params: { keyword } })
      .then((responseObj) => {
        setEvents(responseObj.data.events);
      })
      .catch(err => console.error(err));
  };


  useEffect(() => {
    getEvents();
  }, []);

  const enterClick = (e: { keyCode: number; }) => {
    if (e.keyCode === 13) {
      getEvents();
    }
  };

  const handleChange = (e: { target: HTMLInputElement; }) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      <h1>Search for Events</h1>
      <br/>
      <Grid container spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ maxHeight: '50vh' }}>
      <Grid xs={6}><CssTextField InputLabelProps={fontColor} inputProps={fontColor}
          sx={{ mb: '15px'}} id="keywordSearch" color="secondary" label="search events" type='text' onChange={ handleChange } value={keyword} onKeyDown={enterClick}/>
          <ColorButton mt="50%"onClick={getEvents} size='large' variant="contained"><SearchIcon /></ColorButton>
        </Grid>
      </Grid><br/>
      <Grid container spacing={2}>
        {
          events.map((event, index) => (
            <Grid item xs={12} md={6} lg={4}>
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
};

export default EventListings;
