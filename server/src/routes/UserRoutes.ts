import { Router } from "express";
import { UserController } from "../controllers/UserController";
import jwtMiddleware from "../middlewares/jwtMiddleware";
import { validateBody } from "../middlewares/validationMiddleware";
import { UserCreateIn } from "../utils/dtos/User";

const userController = new UserController();

const routes = Router();
const userRoutes = Router({ mergeParams: true });

routes.post("/", validateBody(UserCreateIn), userController.create);
routes.get("/current", jwtMiddleware, userController.getCurrent);  
routes.use("/:username", userRoutes);
userRoutes.get("/", userController.get);
userRoutes.get("/top-songs", userController.getTopSongs);

export default routes;
