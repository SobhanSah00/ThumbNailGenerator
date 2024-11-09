import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes imports

import userRouter from "./routes/user.routes.js";
import uploadThumbnailRouter from "./routes/uploadTheMlDiagram.routes.js"
import uploadVideoRouter from "./routes/uploadVideo.routes.js"


//routes decalration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/uploadthumbnail",uploadThumbnailRouter)
app.use("/api/v1/uploadVideo",uploadVideoRouter)


export { app };
