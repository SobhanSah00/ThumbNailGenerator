import { asyncHandler } from "../utils/asyncHandeler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadonCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import {Video } from "../models/video.model.js"

const uploadVideo = asyncHandler(async(req,res) => {
    const {videoUrl} = req.body;
    const userId = req.user?._id;

    if(!videoUrl) {
        return new ApiError(400, "Video URL is required");
    }

    if(!userId ) {
        throw new ApiError(400, "Please provide user id");
    }


    const newVideo = await uploadonCloudinary(videoUrl);
    if(!newVideo) {
        throw new ApiError(400, "Failed to upload video");
    }
    const video = await Video.create({videoUrl: newVideo.url, userId})

    await video.save();
    return res.status(201).json({message: "Video uploaded successfully"})
})

export {
    uploadVideo
}