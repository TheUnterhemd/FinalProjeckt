import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({


    body:{
        type: String,
        required: true,
    },
    trainerId:{ type: Schema.Types.ObjectId, ref: 'Trainer' },
    userId:{ type: Schema.Types.ObjectId, ref: 'User' }
    
})

export default mongoose.model('Comment', commentSchema);