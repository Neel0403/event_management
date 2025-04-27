import { Router } from "express"
import { checkSession, guestLogin, login, logout, register } from "../controllers/auth.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/check-session").get(verifyJWT,checkSession);
router.route("/register").post(register);
router.route("/guest-login").post(guestLogin);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);

export default router