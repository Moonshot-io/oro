import { Router } from 'express';
import axios from 'axios';
import path from 'path';
import prisma from '../database/db';
require('dotenv').config();


const commentsRouter = Router();

commentsRouter.post('/', (req, res) => {
  const {comment} = req.body;
  res.send(comment);
  // prisma.comments.create({
  //   data: {
  //     userId: 1,
  //     comment,
  //     photoId: 1,
  //   }
  // })
  //   .then((data) => res.status(200).send(data))
  //   .catch(() => res.sendStatus(500));
});



export default commentsRouter;
