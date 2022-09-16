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

export interface SalesDetailsType {
  public: {
    startDateTime: string;
    startTBD: boolean;
    startTBA: boolean;
    endDateTime: string;
  };
}

export interface PromoterDetailsType {
  id: string;
  name: string;
  description: string;
}

export interface AgeRestrictionType {
  legalAgeEnforced: boolean;
}

export interface BoxOfficeInfoType {
  phoneNumberDetail: string;
  openHoursDetail: string;
  acceptedPaymentDetail: string;
  willCallDetail: string;
  parkingDetails: string;
  accessibleSeatingDetail: string;
}
export interface infoType {
  info: string;
  note: string;
}

export interface generalInfoType {
  generalRule: string;
  childRule: string;
}

export interface seatMapType {
  seatMap: string;
}

export interface attractionType {
  attraction: string;
}
export interface EventDetailsType {
  id: string;
  name: string;
  image: string;
  sales: SalesDetailsType;
  dates: DatesForEventDetailsType;
  promoter: PromoterDetailsType;
  ageRestriction: AgeRestrictionType;
  boxOfficeInfo: BoxOfficeInfoType;
  info: infoType;
  generalInfo: generalInfoType;
  seatMap: seatMapType;
  attraction: attractionType;
  venues: VenuesDetailsType;
  ticketURL: string;
}
