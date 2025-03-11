import { Router } from "express";
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(getEvents)
router.route("/:eventId").get(getEventById)
router.route("/create-event").post(verifyJWT, upload.fields([{ name: "images", maxCount: 4 }]), createEvent)
router.route("/update-event/:eventId").patch(verifyJWT, updateEvent)
router.route("/delete-event/:eventId").delete(verifyJWT, deleteEvent)

export default router