import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateBody } from '../middlewares/validationMiddleware';
import { UserCreateIn } from '../utils/dtos/User';

const userController = new UserController();
const routes = Router();

routes.post('/', validateBody(UserCreateIn), userController.create);
routes.get('/:username', userController.get);

export default routes;
