import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema({

    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    maxStudents:{
        type: String,
    },
    currentStudents:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    price:{
        type: String,
        
    },
    duration:{
        type: String,
    },
    start:{
        type: String,
    },
    end:{
        type: String,
    },
    imgURL:{
        type: String,
    }
    ,
    trainer:{ type: Schema.Types.ObjectId, ref: 'Trainer' }
})

export default mongoose.model('Course', courseSchema);