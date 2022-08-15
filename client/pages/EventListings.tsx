import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import EventCardDetails from '../components/EventCardDetails';
import TextField from '@mui/material/TextField';
import eventDummy from '../../server/database/data/eventDummy';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#9B27B0',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#9B27B0',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1A76D2',
    },
    '&:hover fieldset': {
      borderColor: '#BDBDBD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#9B27B0',
    },
  },
});

const fontColor = {
  style: { color: '#9B27B0' },
};

const EventListings: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [events, setEvents] = useState(eventDummy);

  const getEvents = () => {
    axios
      .get('/events/list', { params: { keyword: keyword } })
      .then((responseObj) => {
        setEvents(responseObj.data.events);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getEvents();
    console.log(keyword);
    console.log('EVENTS', events);
  }, []);

  const enterClick = (e) => {
    if (e.keyCode === 13) {
      getEvents();
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      <br />
      <div>
        <CssTextField
          InputLabelProps={fontColor}
          inputProps={fontColor}
          id='keywordSearch'
          color='secondary'
          label='search events'
          type='text'
          onChange={handleChange}
          value={keyword}
          onKeyDown={enterClick}
        />
      </div>
      <br />
      <div>
        {events.map((event) => (
          <EventCardDetails events={events} event={event} key={event.eventId} />
        ))}
      </div>
    </div>
  );
};

export default EventListings;
