import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // No two users can have the same username
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Each email must be unique
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Password must be at least 6 characters
    },
    role: {
        type: String,
        enum: ["user", "admin"], // Only two roles allowed
        default: "user" // By default, every new user is "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);

export default User;