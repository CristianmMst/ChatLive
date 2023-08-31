import passport from "passport";
import { Router } from "express";
import { User } from "../types/auth";
import { CLIENT_URL } from "../const";
import { createToken } from "../utils/auth";
import { checkSession } from "../middlewares/auth";
import * as authController from "../controllers/auth";

const router = Router();

// Registro & Logeo de forma local
router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);

router.get("/logout/:id", authController.logout);
router.get("/login/failed", authController.loginFailed);
router.get("/verify", checkSession, authController.verifyUser);

// Registro & Logeo con google
router.get(
  "/google",
  passport.authenticate("google", { session: false, scope: ["profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    const user = req.user as User;
    if (user) {
      const token = createToken(user.id);
      res.redirect(`${CLIENT_URL}/auth?token=${token}`);
    }
  }
);

export default router;
