import { Router } from "express";
import { UserRoutes } from "../../../user/infrastructure/routes/UserRoutes";
import { AuthRoutes } from "../../../auth/infrastructure/routes/authRoutes";
import { MessageRoutes } from "../../../message/infrastructure/routes/MessageRoutes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/user", UserRoutes.routes);
    router.use("/auth", AuthRoutes.routes);
    router.use("/messages", MessageRoutes.routes);

    return router;
  }
}
