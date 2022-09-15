require('dotenv').config();
import { Router } from 'express';
import axios from 'axios';
import prisma from '../database/db';

const profileRouter = Router();
const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;


profileRouter.get('/events/:_id', (req, res) => {
  const { _id } = req.params;

  prisma.userEvents.findMany({
    where: {
      userId: _id,
    },
  })
    .then((events) => {
      res.status(200).send(events);
    })
    .catch(err => console.error(err));
})

profileRouter.get('/:_id', (req, res) => {
  const { _id } = req.params;

  prisma.users
    .findUnique({
      where: {
        id: _id,
      },
    })
    .then((userInfo) => {
      res.status(200).send(userInfo);
    })
    .catch((err) => {
      console.error(err);
    });
});

profileRouter.get('/event_photos/:_id', (req, res) => {
  const { _id } = req.params;

  prisma.eventPhotos
    .findMany({
      where: { userId: _id },
    })
    .then((userPhotos) => {
      res.status(200).send(userPhotos);
    })
    .catch((err) => {
      console.error(err);
    });
});

profileRouter.put('/:_id', (req, res) => {
  const { _id } = req.params;
  const { socialMedia } = req.body;
  const { facebook, instagram, twitter } = socialMedia;
  prisma.users
    .update({
      where: { id: _id },
      data: { fbId: facebook, instaId: instagram, twitterId: twitter },
    })
    .then(() => {
      prisma.users
        .findUnique({
          where: {
            id: _id,
          },
        })
        .then((userInfo) => {
          res.status(200).send(userInfo);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => console.error(err));
});

profileRouter.get('/photo_event/:_id', (req, res) => {
  const { _id } = req.params;
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${TICKETMASTER_API_KEY}&id=${_id}`)
    .then(({ data }) => {
      res.status(200).send(data._embedded.events[0]);
    })
    .catch(err => console.error(err));
})

export default profileRouter;
