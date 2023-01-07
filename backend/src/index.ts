import 'dotenv/config';
import express from 'express';
import scrobbleRoutes from './routes/ScrobbleRoutes';
import userRoutes from './routes/UserRoutes';
import trackRoutes from './routes/SongsRoutes';
import albumRoutes from './routes/AlbumsRoutes';
import artistRoutes from './routes/ArtistsRoutes';
import { DateTime } from 'luxon';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('REQUEST', req.method, req.url, 'at ', DateTime.local().toISO());
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  console.log('\nBody: ', req.body, 'Params: ', req.params, 'Query: ', req.query);
  next();
});

app.use('/api', scrobbleRoutes);
app.use('/user', userRoutes);
app.use('/track', trackRoutes);
app.use('/album', albumRoutes);
app.use('/artist', artistRoutes);

app.listen(8000);
