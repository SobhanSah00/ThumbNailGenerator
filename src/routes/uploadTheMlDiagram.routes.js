import { Router } from "express";
import {uploadTheMlDiagram} from "../controllers/imageGenration.controllers.js"

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/uploadTheMlDiagram").post(
    verifyJwt, 
    upload.single("imageUrl"),
    uploadTheMlDiagram
)

export default router; 