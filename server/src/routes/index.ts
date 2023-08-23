import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import messagesRoutes from "./messages";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/auth", authRoutes);
routes.use("/messages", messagesRoutes);

export default routes;
