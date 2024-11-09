import { asyncHandler } from "../utils/asyncHandeler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ImageGenerationModel } from "../models/imageGenration.model.js";
import { uploadonCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";

const uploadTheMlDiagram = asyncHandler(async (req, res) => {
  const userId = req.User?._id;

  // Validate user ID
  //   if (!userId) {
  //     throw new ApiError(400, "Invalid user ID");
  //   }

  //   const user = await User.findById(userId);
  //   if (!user) {
  //     throw new ApiError(404, `User with ID ${userId} not found`);
  //   }

  const user = req.user;

  const imageUploadUrl = req.file?.path;
  if (!imageUploadUrl) {
    throw new ApiError(400, "Please upload an image");
  }

  const image = await uploadonCloudinary(imageUploadUrl);
  if (!image) {
    throw new ApiError(
      400,
      "Image upload to Cloudinary failed. Please check the image component."
    );
  }

  await ImageGenerationModel.create({
    userId: user._id,
    imageUrl: image.url,
    generatedAt: new Date(),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Image uploaded successfully", {
        imageUrl: image.url,
      })
    );
});
export { uploadTheMlDiagram };
