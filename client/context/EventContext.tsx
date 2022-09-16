import axios from 'axios';
import React, { useState, ReactNode } from 'react';
import { EventDetailsType } from '../types';
interface EventContextState {
  eventDetails: EventDetailsType;
  setEventDetails: React.Dispatch<
    React.SetStateAction<EventDetailsType | undefined>
  >;
  getEventDetails: (id: string) => EventDetailsType | undefined;
  setEventId: React.Dispatch<React.SetStateAction<string>>;
  eventId: string;
}
const EventContext = React.createContext({} as EventContextState);

interface Props {
  children?: ReactNode;
}

const EventContextProvider = ({ children, ...props }: Props) => {
  const [eventDetails, setEventDetails] = useState<EventDetailsType>();
  const [eventId, setEventId] = useState<string>('');

  const getEventDetails = (id: string) => {
    axios
      .get('/api/eventDetails', { params: { id } })
      .then(({ data }) => {
        console.log(data);

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
    <EventContext.Provider {...props} value={appProps}>
      {children}
    </EventContext.Provider>
  );
};
export { EventContextProvider, EventContext };
