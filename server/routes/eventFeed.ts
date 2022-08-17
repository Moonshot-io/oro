import { Router } from 'express';
import axios from 'axios';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '../database/db';
require('dotenv').config();

const eventFeedRouter = Router();


eventFeedRouter.post('/', async (req, res) => {
  try {
    const fileStr = req.body.data;
    await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'vibeSocietyImages',
    })
      .then(async(uploadedResponse) => {
        console.log(uploadedResponse);
        await prisma.eventPhotos.create({
          data: {
            userId: 1,
            photoUrl: uploadedResponse.secure_url,
            eventAPIid: 'test',
          }
    
        })
          .then((data) => {
            console.log(data);
            res.sendStatus(200)
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(500)
          });
      })
      .catch(() => res.sendStatus(500));
    // console.log(uploadedResponse);
    // Gallery.create({
    //   url: uploadedResponse.secure_url,
    //   location: req.body.location,
    //   category: req.body.category
    // })
    //   .then(() => res.sendStatus(200))
    //   .catch(() => res.sendStatus(500));

  } catch (error) {
    console.error(error)
    res.sendStatus(500);
  }
});

eventFeedRouter.get('/', async (req, res) => {
  await prisma.eventPhotos.findMany({
    where: {
      eventAPIid: 'test',
    },
    orderBy: {
      created_at: 'asc'
    }
  })
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500)
    });

});

export default eventFeedRouter;
