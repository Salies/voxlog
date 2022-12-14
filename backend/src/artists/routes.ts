import { Router } from 'express';
import * as Artist from './handler';

const routes = Router();
routes.get('/:artistId', Artist.getById);
routes.get('/popular', Artist.getPopular);
routes.get('/search', Artist.searchByName);
export default routes;
