 import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+\@.+\..+/, "please use a valid email address"]
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: {
                url: String,
                public_id: String
            },
            required: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        isverified: {
            type: Boolean,
            default: false
        },
        verifycode: {
            type: String,
            required: [true, "verifycode is required"]
        },
        verifycodeExpiry: {
            type: Date, // Changed to Date type to track expiry time
            required: [true, "verifycode expiry is required"]
        },
        isAcceptingMessage: {
            type: Boolean,
            default: false  // Set default to false if you expect it to be false by default
        },
        refreshToken: {
            type: String,
        },
        role: {
            type: String,
            required: true,
            enum: ['Admin', 'Patient', 'Doctor'],
            default: 'Patient'
        },
        messages: [{
            type: Schema.Types.ObjectId,
            ref: "Message",
            required: true
        }]
    },
    {
        timestamps: true
    }
);



userSchema.pre("save", async function(next){
    if(!this.isModified("password")) {
        return next()
    } 
    
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username : this.username,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)