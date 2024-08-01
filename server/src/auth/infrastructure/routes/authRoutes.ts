import { Router } from "express";
import { AuthService } from "../application/AuthService";
import { AuthController } from "../controllers/AuthController";
import { MongoUserRepository } from "../../../user/infrastructure/databases/MongoUserRepository";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const userRepository = new MongoUserRepository();
    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    router.post("/login", authController.login);
    router.post("/logout/:id", authController.logout);
    router.post("/register", authController.register);

    return router;
  }
}
