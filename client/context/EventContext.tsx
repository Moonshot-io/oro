import axios from 'axios';
import React, { useState } from 'react';
import { EventDetailsType } from '../types';
interface EventContextState {
  eventDetails: EventDetailsType | undefined;
  setEventDetails: React.Dispatch<
    React.SetStateAction<EventDetailsType | undefined>
  >;
  getEventDetails: (id: string) => EventDetailsType | undefined;
}
const EventContext = React.createContext({} as EventContextState);

const EventContextProvider = ({ children }) => {
  const [eventDetails, setEventDetails] = useState<EventDetailsType>();

  const getEventDetails = (id: string) => {
    axios
      .get('/eventDetails', { params: { id } })
      .then(({ data }) => {
        setEventDetails(data);
      })
      .catch((err) => console.error(err));
    return eventDetails;
  };

  const appProps = {
    eventDetails,
    setEventDetails,
    getEventDetails,
  };
  return (
    <EventContext.Provider value={appProps}>{children}</EventContext.Provider>
  );
};
export { EventContextProvider, EventContext };
