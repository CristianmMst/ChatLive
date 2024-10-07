import { Router } from "express";
import { UserService } from "../../application/UserService";
import { UserController } from "../controllers/UserController";
import { MongoUserRepository } from "../databases/MongoUserRepository";
import { checkSession } from "../../../auth/infrastructure/middlewares/checkSession";
import { resizeImage } from "../../../message/infrastructure/middlewares/resizeImage";
import { upload } from "../../../message/infrastructure/middlewares/multer";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const mongoUserRepository = new MongoUserRepository();
    const userService = new UserService(mongoUserRepository);
    const userController = new UserController(userService);

    router.get("/contacts/:id", userController.getContacts);

    router.post("/profile", checkSession, userController.getUser);
    router.patch(
      "/profile",
      checkSession,
      upload.single("avatar"),
      resizeImage,
      userController.updateUser,
    );

    return router;
  }
}
