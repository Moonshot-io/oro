import React, { useState, useEffect } from 'react';
import axios from 'axios'
const EventListings: React.FC = () => {

  const [events, setEvents] = useState([]);

  // BELOW FUNCTION TO BE USED TO REMOVE PUNCTUATION FROM SEARCH QUERY
  // const punctuationless = req.query.keyword
  // .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
  // .replace(/\s{1,}/g, "+")
  // .toLowerCase();

  useEffect(() => {
    axios.get('/events/list', { params: { keyword: 'the flaming lips'} })
      .then((responseObj) => console.log(responseObj))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>Hello EventListings</div>
  );
};

export default EventListings;
