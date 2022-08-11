import path from 'path';
import express from 'express';
import axios from 'axios';

import eventListingsRouter from './routes/eventListingsRouter';
import artistsRouter from './routes/artists';

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

//ROUTERS------------------------------
app.use('/events', eventListingsRouter);
app.use('/artists', artistsRouter);

app.get('/*', (req, res) => {
  console.log('catchall');
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
