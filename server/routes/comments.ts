import { Router } from 'express';
import axios from 'axios';
import path from 'path';
import prisma from '../database/db';
require('dotenv').config();


const commentsRouter = Router();

commentsRouter.get('/', async (req, res) => {
  const {photoUrl} = req.query;

  await prisma.comments.findMany({
    orderBy: [
      {
        created_at: 'asc'
      }
    ],
    where: {
      photoUrl: photoUrl
    }
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
commentsRouter.get('/comment', async (req, res) => {
  let {commentId} = req.query;
  commentId = parseInt(commentId);

  await prisma.comments.findUnique({
    where: {
      id: commentId,
    }
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

commentsRouter.post('/', async (req, res) => {
  const {comment, photoUrl, userId} = req.body;

  await prisma.comments.create({
    data: {
      userId,
      comment,
      photoUrl,
    }
  })
    .then(async (data) => {
      res.status(200).send(data);

    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
commentsRouter.put('/', async (req, res) => {
  const {id, comment} = req.body;

  await prisma.comments.update({
    where: {
      id,
    },
    data: {
      comment,
      edited: true,
    }
  })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
})

commentsRouter.delete('/', async (req, res) => {
  const {id} = req.body;

  await prisma.comments.delete({
    where: {
      id,
    }
  })
    .then(() => {
      prisma.notifications.deleteMany({
        where: {
          commentId: id,
        }
      })
        .then(() => res.sendStatus(200))
        .catch((err) => {
          res.sendStatus(500)
        });
    })
    .catch(() => res.sendStatus(500));
})


commentsRouter.put('/', async (req, res) => {
  const {id, comment} = req.body;

  await prisma.comments.update({
    where: {
      id,
    },
    data: {
      comment,
      edited: true,
    }
  })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});



export default commentsRouter;
