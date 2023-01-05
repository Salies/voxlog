import { Router } from 'express';
import authApi from '../middlewares/authApi';
import * as Scrobble from '../entities/scrobbles/handler';
const routes = Router();

routes.post('/', authApi, Scrobble.create);

export default routes;
