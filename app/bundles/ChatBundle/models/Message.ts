import { Schema, model } from 'mongoose';

const MessageSchema: Schema = new Schema({

    conversation: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    text: String,
    created: Date,
    read: Boolean

});

export default model('Message', MessageSchema);