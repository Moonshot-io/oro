import path from 'path';
import express from 'express';
import axios from 'axios';
import passport from 'passport';
import session from 'express-session';

import eventListingsRouter from './routes/eventListingsRouter';
import artistsRouter from './routes/artists';
import authRouter from './routes/auth';

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

//ROUTERS------------------------------
app.use('/events', eventListingsRouter);
app.use('/artists', artistsRouter);
app.use('/auth', authRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
