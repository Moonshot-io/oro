import axios from 'axios';
import { Router } from 'express';
const travelPlannerRouter = Router();
travelPlannerRouter.get('/locations/:city', (req, res) => {
  const { city } = req.params;
  axios
    .get(
      `https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=${city}&category=hotels&language=en&key=${process.env.TRIP_ADVISOR_API_KEY}`
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
travelPlannerRouter.get('/location/:locationId', (req, res) => {
  const { locationId } = req.params;
  const url = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=${process.env.TRIP_ADVISOR_API_KEY}`;
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
