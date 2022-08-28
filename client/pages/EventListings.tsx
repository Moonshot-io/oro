import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCardDetails from '../components/EventCardDetails';
import eventDummy from '../../server/database/data/eventDummy';
import { CssTextField } from '../styles/material';



const fontColor = {
  style: { color: '#9B27B0' }
};

const EventListings: React.FC = () => {


  const [ keyword, setKeyword ] = useState('');
  const [events, setEvents] = useState(eventDummy);

  const getEvents = () => {
    axios.get('/api/events/list', { params: { keyword: keyword } })
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
      <br/>
      <div>
        <CssTextField InputLabelProps={fontColor} inputProps={fontColor}
          sx={{ mb: '15px'}} id="keywordSearch" color="secondary" label="search events" type='text' onChange={ handleChange } value={keyword} onKeyDown={enterClick} />
      </div><br/>
      <div>
        {
          events.map((event, index) => (
            <EventCardDetails
              event={event}
              key={`event${index}`}
            />
          ))
        }
      </div>
    </div>
  );
};

export default EventListings;
