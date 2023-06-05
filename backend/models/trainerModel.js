import mongoose from "mongoose";

const Schema = mongoose.Schema;

const trainerSchema = new Schema({

    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    adress:{
        type: Array,
        //required: true,
    },
    profession:{
        type: String,
        required: true,
    },
    imgURL:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    trainer: {
        type: Boolean,
        default: true,
    },
    verified:{type: Boolean,default: false},
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

export default mongoose.model('Trainer', trainerSchema);