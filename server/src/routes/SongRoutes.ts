import { Router } from 'express';
import ResourcesController from '../controllers/ResourcesController';
import { validateBody } from '../middlewares/validationMiddleware';
import { UserCreateIn } from '../utils/dtos/User';

const resourcesController = new ResourcesController();
const routes = Router();

routes.get('/:songId', resourcesController.getSongById);

export default routes;
