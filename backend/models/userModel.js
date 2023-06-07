import mongoose from "mongoose";

const Schema = mongoose.Schema;

const setUndefined = (val) => (val === "" ? undefined : val);

 const userSchema = new Schema({
    firstName: {type: String, required: true, set: setUndefined},
    lastName: {type: String, required: true, set: setUndefined},
    address: {
      street: {type: String, set: setUndefined},
      code: {type: String, set: setUndefined},
      city: {type: String, set: setUndefined}
    },
    email: {type: String, required: true, set: setUndefined},
    password: {type: String, required: true, set: setUndefined},
    imgURL: {type: String, default: "https://res.cloudinary.com/dhdugvhj3/image/upload/v1680609327/default_profile_picture/default_profile_picture_qssq71.jpg", set: setUndefined},
    interests: {type: [String], set: setUndefined},
    bookedCourses:[{ type: Schema.Types.ObjectId, ref: 'Course' }],
    solvedCourses:[{ type: Schema.Types.ObjectId, ref: 'Course' }],
    comments:[{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    trainer: {type: Boolean,default: false},
    verified:{type: Boolean,default: false}
 })


 export default mongoose.model('User', userSchema);