import mongoose from "mongoose";


const Schema = mongoose.Schema;

const verifyTokenSchema = new Schema({
    userID:{
        type: String,
        ref: "user",
        required: true
    },
    verifyToken: {
        type: String,
        required: true
    }
});

export default mongoose.model('VerifyToken', verifyTokenSchema);