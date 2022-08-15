import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCardDetailDetails from '../components/EventCardDetailDetails';

import eventDummy from '../../server/database/data/eventDummy';

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

  const [keyword, setKeyword] = useState("jane's addiction");
  const [events, setEvents] = useState(eventDummy);

  const getEvents = () => {
    // const punctuationless: string = keyword
    // .replace(/[']/g, '')
    // .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
    // .replace(/\s{1,}/g, "+")
    // .toLowerCase();
    axios
      .get('/events/list', { params: { keyword: keyword } })
      .then((responseObj) => {
        // console.log('GETEVENTS RESPONSEOBJ', responseObj);
        setEvents(responseObj.data.events);
      })
      .catch(((err)) => console.error(err));
  };

  useEffect(() => {
    getEvents();
    // console.log(keyword);
    // console.log('EVENTS', events);
  }, []);

  const enterClick = (e) => {
    if (e.keyCode === 13) {
      getEvents();
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

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
      <div>Hello EventListings</div>
      <input
        placeholder='enter keywords here (e.g. artist, event, venue, city, state, date...'
        type='text'
        id=''
        onChange={handleChange}
        value={keyword}
        onKeyDown={enterClick}
      ></input>
      <div>
        {events.map((event) => (
          <EventCardDetails events={events} event={event} key={event.eventId} />
        ))}
      </div>
    </div>
  );
};

export default EventListings;
