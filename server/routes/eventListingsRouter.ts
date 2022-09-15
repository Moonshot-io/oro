import axios from 'axios';
import { Router } from 'express';
import prisma from '../database/db';
require('dotenv').config();

const eventListingsRouter = Router();

eventListingsRouter.get('/list', (req, res) => {
  const { keyword } = req.query;
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=20&classificationName=[music, concert, festival]&keyword=${keyword}&apikey=${process.env.TICKETMASTER_API_KEY}`)
    .then((responseObj) => {
      if(responseObj.data._embedded){
      const events = responseObj.data._embedded.events.filter((event: { _embedded: any; }) => {
        return event._embedded;
      }).map((event: { dates: { start: { dateTime: any; }; }; id: any; name: any; images: { url: any; }[]; sales: { public: { startDateTime: any; endDateTime: any; }; }; _embedded: { attractions: any[]; venues: any[]; }; }) => {
        const newDataObj = {
          eventDate: event.dates.start.dateTime,
          eventId: event.id,
          eventName: event.name,
          eventImg: event.images[0].url,
          startDate: event.sales.public.startDateTime,
          endDate: event.sales.public.endDateTime,
        };
        const artistInfo = event._embedded.attractions.map((attraction: { name: any; id: any; images: any; }) => {
          const artistInfo = {
            artistName: attraction.name,
            artistId: attraction.id,
            artistImages: attraction.images
          };
          return artistInfo;
        });

        const venueInfo = event._embedded.venues.map((venue: { id: any; name: any; address: any; city: { name: any; }; stateCode: any; country: { name: any; }; postalCode: any; location: any; images: any; state: { name: null; }; }) => {
          const venueInfo = {
            venueId: venue.id,
            venueName: venue.name,
            address: venue.address,
            city: venue.city.name,
            state: null,
            stateCode: venue.stateCode,
            country: venue.country.name,
            postalCode: venue.postalCode,
            location: venue.location,
            venueImages: venue.images
          };
          if (venue.state) {
            venueInfo.state = venue.state.name;
          }
          return venueInfo;
        });
        newDataObj.venueInfo = venueInfo;
        newDataObj.artistInfo = artistInfo;
        return newDataObj;
      });
      res.status(200).send({events});
    } else {
      console.log('no events from server');
      res.status(200).send('false');
}})
    .catch(err => console.error(err));
});

eventListingsRouter.post('/list/pins', (req, res) => {
  const pinObj = req.body;
  prisma.userEvents.create({
    data: pinObj
  }).then((data) => {
    res.status(201).send(data);
  })
    .catch(err => {
      res.sendStatus(500);
    });
});

eventListingsRouter.get('/list/pins/:id', (req, res) => {
  const { id } = req.params;
  prisma.userEvents.findMany({
    where: { userId: id }
  })
    .then(eventData => {
      res.status(200).send(eventData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });

  eventListingsRouter.delete('/list/pins/:id', (req, res) => {
    const { eventAPIid } = req.body;
    const { id } = req.params;

    prisma.userEvents.deleteMany({
      where: {
        eventAPIid: {
          contains: eventAPIid
        },
        userId: id,
      }
    })
      .then(results => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  });

});


export default eventListingsRouter;
