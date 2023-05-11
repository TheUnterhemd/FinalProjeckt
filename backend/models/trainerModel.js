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
        type: Object,
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
    courses:{
        type: Array,
    }
})

export default mongoose.model('Trainer', trainerSchema);