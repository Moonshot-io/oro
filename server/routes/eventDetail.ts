import axios from 'axios';
import { Router } from 'express';
import { EventDetailsType } from '../../client/types';

const eventDetailsRouter = Router();
eventDetailsRouter.get('/', (req, res) => {
  const { id } = req.query;
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${process.env.TICKETMASTER_API_KEY}&id=${id}`
    )
    .then(({ data }) => {
      const singleEvent = data._embedded.events[0];
      const eventDetails: EventDetailsType = {
        name: singleEvent.name,
        image: singleEvent.images[0].url,
        dates: {
          localDate: singleEvent.dates.start.localDate,
          localTime: singleEvent.dates.start.localTime,
          dateTime: singleEvent.dates.start.dateTime,
          dateTBD: singleEvent.dates.start.dateTBD,
          dateTBA: singleEvent.dates.start.dateTBA,
          timeTBA: singleEvent.dates.start.timeTBA,
          noSpecificTime: singleEvent.dates.start.noSpecificTime,
        },
        //   ageRestrictions: {
        //     legalAgeEnforced: singleEvent.ageRestrictions.legalAgeEnforced,
        // },
        venues: {
          name: singleEvent._embedded.venues[0].name,
          type: singleEvent._embedded.venues[0].type,
          id: singleEvent._embedded.venues[0].id,
          test: singleEvent._embedded.venues[0].test,
          locale: singleEvent._embedded.venues[0].locale,
          postalCode: singleEvent._embedded.venues[0].postalCode,
          timezone: singleEvent._embedded.venues[0].timezone,
          city: {
            name: singleEvent._embedded.venues[0].city.name,
          },
          state: {
            name: singleEvent._embedded.venues[0].state.name,
            stateCode: singleEvent._embedded.venues[0].state.statusCode,
          },
          country: {
            name: singleEvent._embedded.venues[0].country.name,
            countryCode: singleEvent._embedded.venues[0].country.countryCode,
          },
          address: {
            line1: singleEvent._embedded.venues[0].address.line1,
          },
          location: {
            longitude: singleEvent._embedded.venues[0].location.longitude,
            latitude: singleEvent._embedded.venues[0].location.latitude,
          },
          upcomingEvents: {
            _total: singleEvent._embedded.venues[0].upcomingEvents._total,
            tmr: singleEvent._embedded.venues[0].upcomingEvents.tmr,
            ticketmaster:
              singleEvent._embedded.venues[0].upcomingEvents.ticketmaster,
            _filtered: singleEvent._embedded.venues[0].upcomingEvents._filtered,
          },
          _links: {
            self: {
              href: singleEvent._embedded.venues[0]._links.self.href,
            },
          },
        },
        ticketURL: singleEvent.url,
      };
      res.status(200).send(eventDetails);
    })
    .catch((error) => console.error(error));
});

export default eventDetailsRouter;
