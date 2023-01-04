import { Router } from 'express';
import * as Album from '../entities/albums/handler';

const routes = Router();

routes.get('/:albumId', Album.getById);

export default routes;
