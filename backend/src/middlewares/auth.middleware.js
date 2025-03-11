import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorisation")?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json(new ApiResponse(401, "Unauthorised Request"))
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
        return res.status(401).json(new ApiResponse(401, "Invalid Access Token"))
    }

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(401, "Invalid Access Token")
    }

    req.user = user;
    next();
}) 