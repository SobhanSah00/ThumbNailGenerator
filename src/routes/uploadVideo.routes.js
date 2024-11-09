import { Router } from "express";
import {uploadVideo} from "../controllers/uploadVideo.controller.js"

// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/uploadVideo").post(
    verifyJwt, 
    uploadVideo
)

export default router;