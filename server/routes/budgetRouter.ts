import prisma from '../database/db';
import axios from 'axios';
import { Router } from 'express';

const budgetRouter = Router();
budgetRouter.post('/', async (req, res) => {
  const {
    userEventId,

    Tickets,
    Food,
    Drinks,
    Parking,
    Merch,
    Travel,
  } = req.body;
  console.log(req.body);
  await prisma.budget
    .create({
      data: {
        Food,
        Tickets,
        Parking,
        Merch,
        Travel,
        Drinks,
        userEventId: userEventId,
      },
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export default budgetRouter;
