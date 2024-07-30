import { Router } from "express";
import * as userControllers from "../controllers/user";
import { checkSession } from "../middlewares/auth";

const router = Router();

router.get("/", checkSession, userControllers.getUser);
router.get("/contacts/:id", userControllers.getContacts);

export default router;
