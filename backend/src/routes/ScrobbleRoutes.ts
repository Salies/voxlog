import { Router } from 'express';
import jwtApiMiddleware from '../middlewares/jwtApiMiddleware';
// import * as Scrobble from '../entities/scrobbles';
const routes = Router();

// routes.post('/', jwtApiMiddleware, scrobbleController.create);
// routes.post('/', scrobbleController.create);
// routes.post('/login', scrobbleController.login);
export default routes;
