import { Router } from 'express';
import ScrobbleController from '../controllers/ScrobbleController';
import jwtApiMiddleware from '../middlewares/jwtApiMiddleware';
const routes = Router();
const scrobbleController = new ScrobbleController();

// routes.post('/', jwtApiMiddleware, scrobbleController.create);
routes.post('/', scrobbleController.create);
routes.post('/login', scrobbleController.login);
export default routes;
