import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/habitatmern.appspot.com/o/business-man-profile-vector.jpg?alt=media&token=24a0356a-db84-46e7-a923-89479f60a683"
    },
}, {timestamps: true});

const User = mongoose.model("User" , userSchema);

export default User;