import { Router } from "express";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/user", userRoutes);

routes.get("/", (request, response) => {
  return response.json({ message: "ok!" });
});

export { routes };
