import { Router } from 'express';
import * as Artist from '../entities/artists/handler';

const routes = Router();
routes.get('/:artistId', Artist.getById);

export default routes;
