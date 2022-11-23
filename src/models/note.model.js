import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        Title: { type: String,  required: true },
        Description: {type: String,  required: true},
        Colour: {type: String},
        userID: {type:String}
    },
    {
        timestamps: true
    }
);

export default model('Note', userSchema);