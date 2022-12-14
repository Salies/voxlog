import { Router } from 'express';
import ResourcesController from '../controllers/ResourcesController';

const resourcesController = new ResourcesController();
const routes = Router();

routes.get('/:songId', resourcesController.getSongById);
// recieve a song name as a query parameter
routes.get('/search', resourcesController.searchSongByName);
export default routes;
