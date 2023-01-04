import { Router } from 'express';
import * as Tracks from '../entities/tracks/handler';

const routes = Router();

routes.get('/:trackId', Tracks.getTrackById);
routes.get('/search', Tracks.searchTrackByName);
routes.get('/popular', Tracks.getPopularTracks);
export default routes;
