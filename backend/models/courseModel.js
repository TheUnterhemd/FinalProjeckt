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
    currentStudents:{
        type: Array,
        
    },
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
    imageURL:{
        type: String,
    }
    ,
    trainer:{
        type: Object,
    }
})

export default mongoose.model('Course', courseSchema);