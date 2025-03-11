import { Router } from "express"
import { guestLogin, login, register } from "../controllers/auth.controller.js"

const router = Router()

router.route("/register").post(register);
router.route("/guest-login").post(guestLogin);
router.route("/login").post(login);

export default router