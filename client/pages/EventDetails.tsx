import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';

const EventDetails: React.FC = () => {
  const { getEventDetails } = useContext(EventContext);

  const eventData = getEventDetails('Z7r9jZ1AdFYep');

  return <div>{eventData?.name}</div>;
};

export default EventDetails;
