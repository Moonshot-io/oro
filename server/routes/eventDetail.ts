import axios from 'axios';
import { Router } from 'express';

const eventDetailsRouter = Router();
eventDetailsRouter.get('/', (req, res) => {
  const { id } = req.query;
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${process.env.TICKETMASTER_API_KEY}&id=${id}`
    )
    .then(({ data }) => {
      res.status(200).send(data);
    })
    .catch((error) => console.error(error));
});

export default eventDetailsRouter;
