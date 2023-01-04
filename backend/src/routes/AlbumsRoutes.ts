import { Router } from 'express';
import * as Album from '../entities/albums/handler';

const routes = Router();

routes.get('/:albumId', Album.getById);
routes.get('/search', Album.searchByName);
routes.get('/popular', Album.getPopular);
export default routes;
