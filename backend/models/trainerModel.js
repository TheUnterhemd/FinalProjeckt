import mongoose from "mongoose";

const Schema = mongoose.Schema;

const setUndefined = (val) => (val === "" ? undefined : val);

const trainerSchema = new Schema({
  firstName:{type: String,set: setUndefined,required: true,},
  lastName: {type: String,set: setUndefined,required: true,},
  address: {
    street: {type: String,set: setUndefined,required: true,},
    number: {type: Number,set: setUndefined,required: true,},
    code: {type: Number,set: setUndefined,required: true,},
    city: {type: String,set: setUndefined,required: true,}
    },
  profession: {type: String,set: setUndefined,required: true,},
  imgURL: {type: String,set: setUndefined,default:  "https://res.cloudinary.com/dhdugvhj3/image/upload/v1680609327/default_profile_picture/default_profile_picture_qssq71.jpg",},
  password: {type: String,set: setUndefined,required: true,},
  email: {type: String,set: setUndefined,required: true,},
  trainer: {type: Boolean,default: true,},
  verified: {type: Boolean,default: false,},
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model("Trainer", trainerSchema);