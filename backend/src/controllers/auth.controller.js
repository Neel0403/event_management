import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const checkSession = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(401, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, user, "Session valid"));
});

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { refreshToken, accessToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token");
    }
}

const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new ApiError(400, "User already exists")
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role: "USER"
    })

    if (!user) {
        throw new ApiError(500, "User registration failed")
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id)
    console.log("Refresh Token:", refreshToken)
    console.log("Access Token:", accessToken)

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: false,
        sameSite: "None"
    }

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            201, {
            user: createdUser,
            accessToken,
            refreshToken
        },
            "User registered successfully"
        ))
})

const guestLogin = asyncHandler(async (req, res) => {
    const { firstName, lastName, email } = req.body

    if (!firstName) {
        throw new ApiError(400, "First Name is required")
    }

    const guestUser = await User.create({
        firstName,
        lastName,
        email,
        role: "GUEST",
    })

    if (!guestUser) {
        throw new ApiError(500, "Guest user creation failed")
    }

    return res
        .status(201)
        .json(new ApiResponse(201, guestUser, "Guest user created successfully"))
})

// const login = asyncHandler(async (req, res) => {
//     const { email, password } = req.body

//     if (!email || !password) {
//         throw new ApiError(400, "Email and password are required")
//     }

//     const user = await User.findOne({ email })

//     if (!user) {
//         throw new ApiError(404, "User not found")
//     }

//     const isPasswordCorrect = await user.isPasswordCorrect(password)

//     if (!isPasswordCorrect) {
//         throw new ApiError(401, "Invalid credentials")
//     }

//     const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id)

//     const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

//     const options = {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "None"
//     }
//     // return res
//     //     .status(200)
//     //     .cookie("accessToken", accessToken, options)
//     //     .cookie("refreshToken", refreshToken, options)
//     //     .json(new ApiResponse(200, {
//     //         user: loggedInUser,
//     //         accessToken,
//     //         refreshToken
//     //     },
//     //         "User logged in successfully"
//     //     ))
//     return res
//         .status(200)
//         .cookie("accessToken", accessToken, options)
//         .cookie("refreshToken", refreshToken, options)
//         .json(new ApiResponse(200, {
//             user: loggedInUser,
//             accessToken,
//             refreshToken,
//             cookiesSet: {
//                 accessToken: req.cookies?.accessToken || "Not Set",
//                 refreshToken: req.cookies?.refreshToken || "Not Set"
//             }
//         }, "User logged in successfully"));
// })
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: false,
        sameSite: "None",
        domain: "localhost",
        path: "/"
    };

    // ✅ Debugging: Log cookies before sending response
    console.log("Setting Cookies: ", { accessToken, refreshToken });

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);

    console.log("Response Headers:", res.getHeaders()["set-cookie"]);  // ✅ Check if cookies are set in headers

    return res.status(200).json(new ApiResponse(200, {
        user: loggedInUser,
        accessToken,
        refreshToken,
        cookiesSet: {
            accessToken: req.cookies?.accessToken || "Not Set",
            refreshToken: req.cookies?.refreshToken || "Not Set"
        }
    }, "User logged in successfully"));
});


const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true })

    const options = {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: false,
        sameSite: "None",
        domain: "localhost",
        path: '/'
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
})

export {
    register,
    guestLogin,
    login,
    logout,
    checkSession
}