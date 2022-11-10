import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validateBody } from "../middlewares/validationMiddleware";
import { UserCreateIn } from "../utils/dtos/User";

const userController = new UserController();

const routes = Router();
const userRoutes = Router({ mergeParams: true });

routes.post("/", validateBody(UserCreateIn), userController.create);
routes.use("/:username", userRoutes);
userRoutes.get("/", userController.getUserInfo);
userRoutes.get("/top-songs", userController.getTopSongs);

export default routes;
