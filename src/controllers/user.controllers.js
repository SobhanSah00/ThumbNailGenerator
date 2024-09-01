import { asyncHandeler } from "../utils/asyncHandeler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/User/user.models.js"
import userSchema from "../validation/user.validation.js"

const registerUser = asyncHandeler(async (req,res) => {
    
})

export {
    registerUser
}