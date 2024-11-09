import { asyncHandler } from "../utils/asyncHandeler.js";
import { ApiError } from "../utils/ApiError.js";
import {uploadonCloudinary, deleteOnCloudinary} from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";
import fs from "fs";

const uploadVideo = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const videoPath = req.file?.path;

    // Validation
    if (!videoPath) {
        throw new ApiError(400, "No video file provided");
    }

    if (!userId) {
        // Clean up the file if authentication fails
        if (videoPath) {
            await fs.promises.unlink(videoPath).catch(console.error);
        }
        throw new ApiError(401, "Unauthorized - User ID missing");
    }

    let uploadedVideo;
    try {
        // Upload to Cloudinary
        uploadedVideo = await uploadonCloudinary(videoPath);

        if (!uploadedVideo?.url || !uploadedVideo?.public_id) {
            throw new ApiError(500, "Failed to upload video to cloud storage");
        }

        // Create video record in database
        const video = await Video.create({
            userId,
            videoFile: {
                url: uploadedVideo.url,
                public_id: uploadedVideo.public_id
            }
        });

        return res.status(201).json({
            success: true,
            message: "Video uploaded successfully",
            data: {
                videoId: video._id,
                videoUrl: video.videoFile.url
            }
        });
    } catch (error) {
        // If database operation fails, clean up the uploaded file from Cloudinary
        if (uploadedVideo?.public_id) {
            await deleteOnCloudinary(uploadedVideo.public_id).catch(console.error);
        }
        throw error;
    }
});

export { uploadVideo };
