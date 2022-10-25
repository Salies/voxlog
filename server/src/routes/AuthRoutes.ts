import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateBody } from '../middlewares/validationMiddleware';
import { UserLoginIn } from '../utils/dtos/User';

const authController = new AuthController();
const routes = Router();

routes.post('/', validateBody(UserLoginIn), authController.login);

export default routes;
