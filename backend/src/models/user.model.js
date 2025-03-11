import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true      // for searching
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: function () { return !this.isGuest },
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        validate: { // Doesn't allow password for guest users
            validator: function (value) {
                if (this.isGuest && value) {
                    return false
                }
                return true;
            }
        },
        required: function () { return !this.isGuest},
    },
    role: {
        type: String,
        enum: ["USER", "GUEST"],
        default: "USER"
    },
    isGuest: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

// callback not used bcoz it doesnt give access to "this" keyword,hence context is not defined
userSchema.pre("save", async function (next) {
    // save the hashed password only if password field is modified
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)  // 10 is no. of rounds
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)   // this.password is the encrypted password 
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)