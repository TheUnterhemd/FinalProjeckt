import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    adress: String,
    email: String,
    password: String,
    imgURL: String,
    interests: [String],
    bookedCourses: Array,
    solvedCourses: Array,
    comments: Array,
 })

 const User = new mongoose.models('User', userSchema);

 export default User;