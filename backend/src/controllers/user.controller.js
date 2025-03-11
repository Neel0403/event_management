import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const updateProfile = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!(firstName, lastName, email, password)) {
        throw new ApiError(400, "At least one field is required")
    }
    
    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        $set: {
            firstName,
            lastName,
            email,
            password
        }
    }, { new: true })

    if (!updatedUser) {
        throw new ApiError(400, "User not updated")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "User updated", updatedUser))
})

const deleteProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const deletedUser = await User.findByIdAndDelete(req.user._id)

    if (!deletedUser) {
        throw new ApiError(400, "User not deleted")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "User deleted", deletedUser))
})

export {
    updateProfile,
    deleteProfile
}