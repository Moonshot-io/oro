// import axios from 'axios';
import React, { useState } from 'react';

const EventContext = React.createContext({});

const EventContextProvider = ({ children }) => {
  const [eventInfo, setEventInfo] = useState([]);

  const appProps = {
    eventInfo,
    setEventInfo,
  };
  return (
    <EventContext.Provider value={appProps}>{children}</EventContext.Provider>
  );
};
export { EventContextProvider, EventContext };