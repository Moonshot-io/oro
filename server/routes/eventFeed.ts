import { Router } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '../database/db';
require('dotenv').config();

const eventFeedRouter = Router();


eventFeedRouter.post('/', async (req, res) => {
  const {imageData, eventId, userId, caption} = req.body;
  try {
    const fileStr = imageData;
    await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'vibeSocietyImages',
    })
      .then(async(uploadedResponse) => {
        await prisma.eventPhotos.create({
          data: {
            userId: userId.toString(),
            photoUrl: uploadedResponse.secure_url,
            eventAPIid: eventId,
            caption,
          }

        })
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.sendStatus(500);
          });
      })
      .catch(() => res.sendStatus(500));

  } catch (error) {
    res.sendStatus(500);
  }
});

eventFeedRouter.get('/avatar', async (req, res) => {
  const {userId} = req.query;
  
  await prisma.users.findFirst({
    where: {
      id: userId as string,
    }
  })
    .then((data) => {
      res.status(200).send(data?.profileURL);
    })
    .catch(() => {
      res.sendStatus(500);

    });
});

eventFeedRouter.get('/', async (req, res) => {
  const {eventId} = req.query;
  await prisma.eventPhotos.findMany({
    where: {
      eventAPIid: eventId as string,
    },
    orderBy: [
      {
        created_at: 'desc'
      }
    ]
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.sendStatus(500);
    });

});

eventFeedRouter.get('/photo', async (req, res) => {
  const {photoUrl} = req.query;
  await prisma.eventPhotos.findFirst({
    where: {
      photoUrl: photoUrl as string,
    },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.sendStatus(500);
    });

});

eventFeedRouter.put('/', async (req, res) => {
  const {photoUrl, caption} = req.body;

  await prisma.eventPhotos.updateMany({
    where: {
      photoUrl: photoUrl,
    },
    data: {
      caption,
    }
  })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      res.sendStatus(500);
    });
});

eventFeedRouter.delete('/', async (req, res) => {
  const {photoUrl} = req.body;
  await prisma.eventPhotos.deleteMany({
    where: {
      photoUrl,
    }
  })
    .then(() => {
      prisma.comments.findMany({
        where: {
          photoUrl,
        }
      })
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

export default eventFeedRouter;
