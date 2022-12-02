import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        Title: { type: String,  required: true },
        Description: {type: String,  required: true},
        Colour: {type: String},
        userID: {type:String},
        isArchived:{type: Boolean,default: false},
        isTrash:{type: Boolean,default: false}
        
    },
    {
        timestamps: true
    }
);

export default model('Note', userSchema);