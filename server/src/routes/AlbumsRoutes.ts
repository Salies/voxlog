import { Router } from 'express';
import ResourcesController from '../controllers/ResourcesController';

const resourcesController = new ResourcesController();
const routes = Router();

routes.get('/:albumId', resourcesController.getAlbumById);

export default routes;
