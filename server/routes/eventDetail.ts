import axios from 'axios';
import { Router } from 'express';
import prisma from '../database/db';

const eventDetailsRouter = Router();
eventDetailsRouter.get('/', (req, res) => {
  const { id } = req.query;
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${process.env.TICKETMASTER_API_KEY}&id=${id}`
    )
    .then(({ data }) => {
      const singleEvent = data._embedded.events[0];
      const eventDetails = {
        id: singleEvent?.id,
        name: singleEvent?.name,
        image: singleEvent?.images[0].url,
        sales: {
          public: {
            startDateTime: singleEvent?.sales.public.startDateTime,
            startTBD: singleEvent?.sales.public.startTBD,
            startTBA: singleEvent?.sales.public.startTBA,
            endDateTime: singleEvent?.sales.public.endDateTime,
          },
        },
        dates: {
          localDate: singleEvent?.dates.start.localDate,
          localTime: singleEvent?.dates.start.localTime,
          dateTime: singleEvent?.dates.start.dateTime,
          dateTBD: singleEvent?.dates.start.dateTBD,
          timeTBA: singleEvent?.dates.start.timeTBA,
          noSpecificTime: singleEvent?.dates.start.noSpecificTime,
        },
        promoter: {
          id: singleEvent?.promoter.id,
          name: singleEvent?.promoter.name,
          description: singleEvent?.promoter.description,
        },
        ageRestrictions: {
          legalAgeEnforced: singleEvent?.ageRestrictions.legalAgeEnforced,
        },
        boxOfficeInfo: {
          phoneNumberDetail:
            singleEvent?._embedded.venues[0].boxOfficeInfo.phoneNumberDetail,
          openHoursDetail:
            singleEvent?._embedded.venues[0].boxOfficeInfo.openHoursDetail,
          acceptedPaymentDetail:
            singleEvent?._embedded.venues[0].boxOfficeInfo
              .acceptedPaymentDetail,
          willCallDetail:
            singleEvent?._embedded.venues[0].boxOfficeInfo.willCallDetail,
          parkingDetails: singleEvent?._embedded.venues[0].parkingDetail,
          accessibleSeatingDetail:
            singleEvent?._embedded.venues[0].accessibleSeatingDetail,
        },
        info: {
          info: singleEvent?.info,
          note: singleEvent?.pleaseNote,
        },
        generalInfo: {
          generalRule:
            singleEvent?._embedded?.venues[0]?.generalInfo?.generalRule,
          childRule: singleEvent?._embedded?.venues[0]?.generalInfo?.childRule,
        },
        seatMap: {
          seatMap: singleEvent?.seatmap?.staticUrl,
        },
        attraction: {
          attraction: singleEvent?._embedded?.attractions,
        },
        venues: {
          name: singleEvent?._embedded.venues[0].name,
          type: singleEvent?._embedded.venues[0].type,
          id: singleEvent?._embedded.venues[0].id,
          test: singleEvent?._embedded.venues[0].test,
          locale: singleEvent?._embedded.venues[0].locale,
          postalCode: singleEvent?._embedded.venues[0].postalCode,
          timezone: singleEvent?._embedded.venues[0].timezone,
          city: {
            name: singleEvent?._embedded.venues[0].city.name,
          },
          state: {
            name: singleEvent?._embedded.venues[0].state.name,
            stateCode: singleEvent?._embedded.venues[0].state.statusCode,
          },
          country: {
            name: singleEvent?._embedded.venues[0].country.name,
            countryCode: singleEvent?._embedded.venues[0].country.countryCode,
          },
          address: {
            line1: singleEvent?._embedded.venues[0].address.line1,
          },
          location: {
            longitude: singleEvent?._embedded.venues[0].location.longitude,
            latitude: singleEvent?._embedded.venues[0].location.latitude,
          },
          upcomingEvents: {
            _total: singleEvent?._embedded.venues[0].upcomingEvents._total,
            tmr: singleEvent?._embedded.venues[0].upcomingEvents.tmr,
            ticketmaster:
              singleEvent?._embedded.venues[0].upcomingEvents.ticketmaster,
            _filtered:
              singleEvent?._embedded.venues[0].upcomingEvents._filtered,
          },

          _links: {
            self: {
              href: singleEvent?._embedded.venues[0]._links.self.href,
            },
          },
        },
        ticketURL: singleEvent?.url,
      };
      res.status(200).send(eventDetails);
    })
    .catch((error) => console.error(error));
});

eventDetailsRouter.post('/pins', (req, res) => {
  const pinObj = req.body;
  prisma.userEvents
    .create({
      data: pinObj,
    })
    .then((data) => {
      res.send(data).status(201);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error(err);
    });
});

eventDetailsRouter.get('/pins', (req, res) => {
  prisma.userEvents
    .findMany()
    .then((eventData) => {
      res.send(eventData).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

eventDetailsRouter.delete('/pins/:id', (req, res) => {
  const { id } = req.params;
  prisma.userEvents
    .deleteMany({
      where: {
        eventAPIid: {
          contains: id,
        },
      },
    })
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});
export default eventDetailsRouter;
