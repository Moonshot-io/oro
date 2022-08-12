import { Router } from 'express';
import axios from 'axios';
const artistsRouter = Router();
import prisma from '../database/db';

artistsRouter.get('/', (req, res) => {
  prisma.artistFollowing.findMany()
    .then((artistData) => {
      console.info(artistData);
      res.status(200).send(artistData);
    })
    .catch((err) => {
      // console.error(err);
      res.status(500);
      res.end();
    });


  // axios.get(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=SptQUng7VWQQ0BVM0uspyhpoyHGkNSq4&keyword=${artistName}`)
  //   .then((artistData) => {
  //     console.info(artistData);
  //     res.status(200).send(artistData.data._embedded);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.status(500);
  //     res.end();
  //   });
});

export default artistsRouter;
