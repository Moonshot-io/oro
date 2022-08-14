import axios from 'axios';
import React, { useState } from 'react';
import { EventDetailsType } from '../types';
interface EventContextState {
  eventDetails: EventDetailsType | undefined;
  setEventDetails: React.Dispatch<
    React.SetStateAction<EventDetailsType | undefined>
  >;
  getEventDetails: (id: string) => EventDetailsType | undefined;
  setEventId: React.Dispatch<React.SetStateAction<string>>;
  eventId: string;
}
const EventContext = React.createContext({} as EventContextState);

const EventContextProvider = ({ children }) => {
  const [eventDetails, setEventDetails] = useState<EventDetailsType>();
  const [eventId, setEventId] = useState<string>('');

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
    eventId,
    setEventId,
  };
  return (
    <EventContext.Provider value={appProps}>{children}</EventContext.Provider>
  );
};
export { EventContextProvider, EventContext };
