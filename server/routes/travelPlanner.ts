import axios from 'axios';
import { Router } from 'express';
const travelPlannerRouter = Router();
const baseUrl = 'https://api.content.tripadvisor.com/api/v1';

travelPlannerRouter.get('/hotels', (req, res) => {
  const { city, state } = req.query;

  if (!city || !state) {
    return res.status(400).send('Please pick an event with a city and state');
  }

  axios
    .get(
      `${baseUrl}/location/search?searchQuery=${city}, ${state}&category=hotels&language=en&key=${process.env.TRIP_ADVISOR_API_KEY}`
    )
    .then(({ data }) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Error occurred, please try again later.' });
    });
});
travelPlannerRouter.get('/hotels/:locationId', (req, res) => {
  const { locationId } = req.params;

  if (!locationId) {
    return res.status(400).send('Please pick a hotel.');
  }

  const url = `${baseUrl}/location/${locationId}/details?key=${process.env.TRIP_ADVISOR_API_KEY}`;
  axios
    .get(url)
    .then(({ data }) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .send({ message: 'Error occurred, please try again later.' });
    });
});
export default travelPlannerRouter;
