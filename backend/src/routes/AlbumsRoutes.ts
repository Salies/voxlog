import { Router } from 'express';
import * as Resources from '../entities/resources';

const routes = Router();

routes.get('/:albumId', Resources.getAlbumById);

export default routes;
