import { Router } from 'express';
import ScrobbleController from '../controllers/ScrobbleController';

const routes = Router();
const scrobbleController = new ScrobbleController();

routes.get('/:id', scrobbleController.get);
export default routes;
