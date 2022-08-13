import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCards from '../components/EventCards';
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

  // const [ keyword, setKeyword ] = useState(`jane's addiction`);
  // console.log(keyword)
  const [keyword, setKeyword] = useState("jane's addiction");
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    const punctuationless: string = keyword
      .replace(/[']/g, '')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
      .replace(/\s{1,}/g, '+')
      .toLowerCase();
    axios
      .get('/events/list', { params: { keyword: punctuationless } })
      .then((responseObj) => {
        // console.log(responseObj);
        setEvents(responseObj.data.events);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getEvents();
    // console.log('EVENTS', events);
  }, []);

  return (
    <div>
      <div>Hello EventListings</div>
      <input placeholder='enter keywords here (e.g. artist, event, venue, city, state, date...'></input>
      <div>
        <EventCards events={events} setEvents={setEvents} keyword={keyword} />
      </div>
    </div>
  );
};

export default EventListings;
