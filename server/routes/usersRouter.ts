import { Router } from 'express';
import prisma from '../database/db';

const usersRouter = Router();

usersRouter.get('/allusers', async (req, res, next) => {
  const id = req.params.id;
  try {
    const users = await prisma.users.findMany({
      where: {
        id: {
          not: req.params.id,
        }
      }
    });
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
});

export default usersRouter;