import { asyncHandeler } from "../utils/asyncHandeler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User/user.models.js";

const registerUser = asyncHandeler(async (req, res) => {
    const {username,fullname,email,password} = req.body;
    console.log(username,fullname,email,password);
    res.json(200,new ApiResponse(200,"user information is extracted successfully . "))
});

export { registerUser };