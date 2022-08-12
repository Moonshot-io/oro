import path from 'path'
import expres from 'express'
import axios from 'axios'
import { Router } from 'express'
import { inspect } from 'node:util'
require('dotenv').config();

const eventListingsRouter = Router();

eventListingsRouter.get('/list', (req, res) => {
  const { keyword } = req.query;
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=${keyword}&apikey=${process.env.TICKETMASTER_API_KEY}`)
  .then((responseObj) => {
      let venueInfo;
      const events = responseObj.data._embedded.events.filter((event: any) => {
        return event._embedded
      }).map((event) => {
        let newDataObj: any = {
          eventDate: event.dates.start.dateTime,
          eventId: event.id,
        };
        const artistInfo = event._embedded.attractions.map(attraction => {
          const artistInfo = {
            artistName: attraction.name,
            artistId: attraction.id,
            artistImages: attraction.images
          }
          return artistInfo;
          })

          const venueInfo = event._embedded.venues.map(venue => {
            const venueInfo = {
              venueId: venue.id,
              venueName: venue.name,
              address: venue.address,
              city: venue.city.name,
              state: venue.state.name,
              stateCode: venue.stateCode,
              country: venue.country.name,
              postalCode: venue.postalCode,
              location: venue.location,
              venueImages: venue.images
            }
            return venueInfo;
          })

          newDataObj.venueInfo = venueInfo;
          newDataObj.artistInfo = artistInfo

    return newDataObj
      })
      res.send({
        events
      })
      res.status(200);
    })
    .catch(err => console.error(err));
})


export default eventListingsRouter;