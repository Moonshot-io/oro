import { Router } from 'express';
import prisma from '../database/db';

const notificationsRouter = Router();

notificationsRouter.get('/', async (req, res) => {
  const {userId} = req.query;
  await prisma.notifications.findMany({
    where: {
      userId: userId as string,
    },
    orderBy: {
      created_at: 'desc',
    }
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });

});

notificationsRouter.post('/', async (req, res) => {
  const {commentId, ownerId} = req.body;
  await prisma.notifications.create({
    data: {
      userId: ownerId,
      commentId,
      type: 'comment',
    }
  }).then((data) => {
    res.status(200).send(data);
  }).catch(() => res.sendStatus(500));
});

notificationsRouter.put('/', async (req, res) => {
  const {userId} = req.body;

  await prisma.notifications.updateMany({
    where: {
      userId,
      read: false,
    },
    data: {
      read: true,
    }
  })
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

notificationsRouter.delete('/all', async (req, res) => {
  const {userId} = req.body;

  await prisma.notifications.deleteMany({
    where: {
      userId,
    }
  })
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

notificationsRouter.delete('/', async (req, res) => {
  const {commentId} = req.body;
  await prisma.comments.deleteMany({
    where: {
      id: commentId,
    }
  })
    .then(() => {
      prisma.notifications.deleteMany({
        where: {
          commentId,
        }
      })
        .then((data) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.sendStatus(500);
        });

    })
    .catch((err) => {
      console.error(err);
    });
});

export default notificationsRouter;
