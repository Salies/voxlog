import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userController = new UserController();
const routes = Router();

routes.post('/', userController.create);
routes.get('/:username', userController.get);

export default routes;
