import { Router } from 'express';
import axios from 'axios';
const artistsRouter = Router();

artistsRouter.get('/', (req, res) => {
  console.log('get artists-----', req.query);
  const {artistName} = req.query;
  console.log(artistName);
  axios.get(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=SptQUng7VWQQ0BVM0uspyhpoyHGkNSq4&keyword=${artistName}`)
    .then((artistData) => {
      console.log(artistData);
      res.status(200).send(artistData.data._embedded);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.end();
    });
});

export default artistsRouter;
