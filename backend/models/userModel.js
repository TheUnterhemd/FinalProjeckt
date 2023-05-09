import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    firstName: {type: String, unique: true, set: a => a === '' ? undefined : a},
    lastName: {type: String, unique: true, set: b => b === '' ? undefined : b},
    address: {type: String, unique: true, set: c => c === '' ? undefined : c},
    email: {type: String },
    password: {type: String, unique: true, set: d => d === '' ? undefined : d},
    imgURL: {type: String, default: "https://res.cloudinary.com/dhdugvhj3/image/upload/v1680609327/default_profile_picture/default_profile_picture_qssq71.jpg", set: e => e === '' ? undefined : e},
    interests: {type: [String], unique: true, set: f => f === '' ? undefined : f},
    bookedCourses: Array,
    solvedCourses: Array,
    comments: Array,
 })

 const User = new mongoose.model('User', userSchema);

 export default User;