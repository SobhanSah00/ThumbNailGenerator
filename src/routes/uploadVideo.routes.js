import { Router } from "express";
import { uploadVideo } from "../controllers/uploadVideo.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/upload")
    .post(
        verifyJwt,
        upload.single("videoFile"),
        uploadVideo
    );

export default router;
 