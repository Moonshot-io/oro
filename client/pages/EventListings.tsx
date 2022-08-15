import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import EventCardDetails from '../components/EventCardDetails';

import eventDummy from '../../server/database/data/eventDummy';
const EventListings: React.FC = () => {

  // const [events, setEvents] = useState([]);

  // BELOW FUNCTION TO BE USED TO REMOVE PUNCTUATION FROM SEARCH QUERY
  // const punctuationless = req.query.keyword
  // .replace(/[']/g, '')
  // .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
  // .replace(/\s{1,}/g, "+")
  // .toLowerCase();

  // EVENT LISTING URL
  // https://www.ticketmaster.com/event/${eventIdHere}

  const [ keyword, setKeyword ] = useState('jane\'s addiction');
  const [events, setEvents] = useState(eventDummy);

  const getEvents = () => {
    axios.get('/events/list', { params: { keyword: keyword } })
>>>>>>> c56d926 (Update EventListings.tsx)
      .then((responseObj) => {
        setEvents(responseObj.data.events);
      })
      .catch(err => console.error(err));
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
      <br/>
      <div>
        <CssTextField InputLabelProps={fontColor} inputProps={fontColor} id="keywordSearch" color="secondary" label="search events" type='text' onChange={ handleChange } value={keyword} onKeyDown={enterClick} />
      </div><br/>
      <div>
        {
          events.map(event => (
            <EventCardDetails
              events={ events }
              event={event}
              key={event.eventId}
            />
          ))
        }
>>>>>>> c56d926 (Update EventListings.tsx)
      </div>
    </div>
  );
};

export default EventListings;
