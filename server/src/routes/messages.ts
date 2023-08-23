import { Router } from "express";
import * as messagesController from "../controllers/messages";

const router = Router();

router.post("/addMessage", messagesController.addMessage);
router.post("/getMessages", messagesController.getMessages);

export default router;
