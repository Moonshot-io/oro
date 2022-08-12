export interface DatesForEventDetailsType {
  localDate: Date;
  localTime: Date;
  dateTime: Date;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}

export interface VenuesDetailsType {
  name: string;
  type: string;
  id: string;
  test: boolean;
  locale: string;
  postalCode: string;
  timezone: string;
  city: {
    name: string;
  };
  state: {
    name: string;
    stateCode: string;
  };
  country: {
    name: string;
    countryCode: string;
  };
  address: {
    line1: string;
  };
  location: {
    longitude: string;
    latitude: string;
  };
  upcomingEvents: {
    _total: string;
    tmr: string;
    ticketmaster: string;
    _filtered: string;
  };
  _links: {
    self: {
      href: string;
    };
  };
}

export interface EventDetailsType {
  name: string;
  image: string;
  dates: DatesForEventDetailsType;
  venues: VenuesDetailsType;
  ticketURL: string;
}
