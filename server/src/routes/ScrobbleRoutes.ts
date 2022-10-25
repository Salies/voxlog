import { Router } from 'express';
import ScrobbleController from '../controllers/ScrobbleController';

const routes = Router();
const scrobbleController = new ScrobbleController();

routes.post('/', scrobbleController.post);
export default routes;
