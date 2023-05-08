import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    email: {type: String },
    password: String,
    profilePicture: {type: String, default: "https://res.cloudinary.com/dhdugvhj3/image/upload/v1680609327/default_profile_picture/default_profile_picture_qssq71.jpg"},
    interests: [String],
    bookedCourses: Array,
    solvedCourses: Array,
    comments: Array,
 })

 const User = new mongoose.model('User', userSchema);

 export default User;