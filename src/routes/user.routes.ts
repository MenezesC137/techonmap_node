import { Router } from "express";
import UserController from "../controllers/UserController";
import { authenticateToken } from "../middlewares/authenticateToken";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/register", userController.register);
userRoutes.get("/current", authenticateToken, userController.currentUser);

export { userRoutes };
