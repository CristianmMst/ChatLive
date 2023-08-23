import { Router } from "express";
import * as userControllers from "../controllers/user";

const router = Router();

router.get("/contacts/:id", userControllers.getContacts);

export default router;
