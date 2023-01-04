import 'dotenv/config';
import express from 'express';
import scrobbleRoutes from './routes/ScrobbleRoutes';
const app = express();
import userRoutes from './routes/UserRoutes';
import trackRoutes from './routes/SongsRoutes';
import albumRoutes from './routes/AlbumsRoutes';
import artistRoutes from './routes/ArtistsRoutes';
import { DateTime } from 'luxon';

app.use(express.json());
// CORS - enable cross-origin resource sharing\
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  }

  console.log('REQUEST', req.method, req.url, 'at ', DateTime.local().toISO());
  console.log('\nBody: ', req.body, 'Params: ', req.params, 'Query: ', req.query);
  next();
});

app.use('/api', scrobbleRoutes);

app.use('/user', userRoutes);

app.use('/track', trackRoutes);
app.use('/album', albumRoutes);
app.use('/artist', artistRoutes);

app.listen(8000);
