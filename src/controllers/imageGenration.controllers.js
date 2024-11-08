import { asyncHandler } from "../utils/asyncHandeler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model.js";
import { imageGenerationModel } from "../models/imageGenration.model.js"


const uploadTheMlDiagram = asyncHandler(async (req,res) => {
    const {image} = req.body;
    const user = await User.findById(req.User._id);
    // const imageGenration = await imageGenerationModel.create({image, user})
    // upload the image in user database
    const imageUploadUrl = req.file?.path
    if(!imageUploadUrl) {
        return new ApiError(400, "Please upload an image")
    }

    res.status(201).json({message: "Image uploaded successfully"})
})
