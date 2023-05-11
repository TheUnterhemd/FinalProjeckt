import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({


    body:{
        type: String,
        required: true,
    },
    trainerId:{
        type: String,
        required : true,
    },
    userId:{
        type: String,
        required : true,
    }
    
})

export default mongoose.model('Comment', commentSchema);