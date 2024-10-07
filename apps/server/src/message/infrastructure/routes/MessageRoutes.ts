import { Router } from "express";
import { upload } from "../middlewares/multer";
import { resizeImage } from "../middlewares/resizeImage";
import { MessageService } from "../../application/MessageService";
import { MessageController } from "../controllers/MessageController";
import { MongoMessageRepository } from "../databases/MongoMessageRepository";

export class MessageRoutes {
  static get routes(): Router {
    const router = Router();
    const messageRepository = new MongoMessageRepository();
    const messageService = new MessageService(messageRepository);
    const messageController = new MessageController(messageService);

    router.post(
      "/addMessage",
      upload.single("image"),
      resizeImage,
      messageController.addMessage,
    );

    router.post("/getMessages", messageController.getMessages);
    router.get("/download/:public_id", messageController.downloadImage);

    return router;
  }
}
