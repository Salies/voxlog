import 'dotenv/config';
import express from 'express';
import scrobbleRoutes from './routes/ScrobbleRoutes';
const app = express();
import userRoutes from './routes/UserRoutes';
import authRoutes from './routes/AuthRoutes';
import songsRoutes from './routes/SongsRoutes';
import albumsRoutes from './routes/AlbumsRoutes';
import artistsRoutes from './routes/ArtistsRoutes';
import { DateTime } from 'luxon';

app.use(express.json());
// CORS - enable cross-origin resource sharing\
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  }

  console.log('REQUEST', req.method, req.url, 'at ', DateTime.local().toISO());
  console.log(
    '\nBody: ',
    req.body,
    'Params: ',
    req.params,
    'Query: ',
    req.query,
  );
  next();
});

app.use('/api', scrobbleRoutes);
app.use('/users', userRoutes);

app.use('/songs', songsRoutes);
app.use('/albums', albumsRoutes);
app.use('/artists', artistsRoutes);

app.use('/login', authRoutes);

app.listen(8000);
