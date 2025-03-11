import { Router } from "express";
import { deleteProfile, updateProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/update").patch(verifyJWT, updateProfile);
router.route("/delete").delete(verifyJWT, deleteProfile);

export default router