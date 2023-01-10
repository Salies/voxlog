import 'dotenv/config';
import express, { Request, Response } from 'express';
import scrobblesRoutes from './scrobbles/routes';
import userRoutes from './users/routes';
import trackRoutes from './tracks/routes';
import albumRoutes from './albums/routes';
import artistRoutes from './artists/routes';
import { DateTime } from 'luxon';
import { cors } from './utils/cors';

const app = express();
app.use(express.json());
app.use((req, res, next) => cors(req, res, next));

app.use('/scrobbles', scrobblesRoutes);
app.use('/users', userRoutes);
app.use('/tracks', trackRoutes);
app.use('/albums', albumRoutes);
app.use('/artists', artistRoutes);

app.listen(8000);
