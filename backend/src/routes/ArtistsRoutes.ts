import { Router } from 'express';
import * as Resources from '../entities/resources';

const routes = Router();
routes.get('/:artistId', Resources.getArtistById);

export default routes;
