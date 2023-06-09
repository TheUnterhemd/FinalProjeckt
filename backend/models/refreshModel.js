import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema({

    refreshToken: String,
    count: {type: Number, default: 0},
    trainer:{ type: Schema.Types.ObjectId, ref: 'Trainer' },
    user:{ type: Schema.Types.ObjectId, ref: 'User' }

})

export default mongoose.model('Token', courseSchema);