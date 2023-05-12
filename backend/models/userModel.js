import mongoose from "mongoose";

const Schema = mongoose.Schema;

 const userSchema = new Schema({
    firstName: {type: String, required: true, set: a => a === '' ? undefined : a},
    lastName: {type: String, required: true, set: b => b === '' ? undefined : b},
    address: {type: String, set: c => c === '' ? undefined : c},
    email: {type: String },
    password: {type: String, required: true, set: d => d === '' ? undefined : d},
    imgURL: {type: String, default: "https://res.cloudinary.com/dhdugvhj3/image/upload/v1680609327/default_profile_picture/default_profile_picture_qssq71.jpg", set: e => e === '' ? undefined : e},
    interests: {type: [String], set: f => f === '' ? undefined : f},
    bookedCourses:[{ type: Schema.Types.ObjectId, ref: 'Course' }],
    solvedCourses:[{ type: Schema.Types.ObjectId, ref: 'Course' }],
    comments:[{ type: Schema.Types.ObjectId, ref: 'Comment' }],
 })


 export default mongoose.model('User', userSchema);