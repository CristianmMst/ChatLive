import { Router } from "express";
import { UserService } from "../../application/UserService";
import { UserController } from "../controllers/UserController";
import { MongoUserRepository } from "../databases/MongoUserRepository";
import { checkSession } from "../../../auth/infrastructure/middlewares/checkSession";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const mongoUserRepository = new MongoUserRepository();
    const userService = new UserService(mongoUserRepository);
    const userController = new UserController(userService);

    router.post("/profile", checkSession, userController.getUser);
    router.get("/contacts/:id", userController.getContacts);

    return router;
  }
}
