import { Router } from 'express';
import * as Tracks from '../entities/tracks/handler';

const routes = Router();

routes.get('/:trackId', Tracks.getById);
routes.get('/search', Tracks.searchByName);
routes.get('/popular', Tracks.getPopular);
export default routes;
