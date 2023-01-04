import { Router } from 'express';
import jwtMiddleware from '../middlewares/jwtMiddleware';
import { validateBody } from '../middlewares/validationMiddleware';
import { UserCreateIn, UserLoginIn } from '../utils/dtos/User';
import * as User from '../entities/users/handler';

const routes = Router();
const userRoutes = Router({ mergeParams: true });

// users/
routes.post('/auth', validateBody(UserLoginIn), User.login);
routes.delete('/auth', jwtMiddleware, User.logout);

routes.post('/', validateBody(UserCreateIn), User.create);
routes.get('/current', jwtMiddleware, User.getCurrent);
routes.use('/:username', userRoutes);

// /users/:username
userRoutes.get('/', User.get);
userRoutes.get('/stats', User.getStats);
userRoutes.get('/recent-scrobbles', User.getRecentScrobbles);

export default routes;
