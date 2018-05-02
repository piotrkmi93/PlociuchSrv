import { Schema, model } from 'mongoose';

const MessageSchema: Schema = new Schema({

    conversation: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    text: String,
    created: Date,
    read: { type: Date }

});

MessageSchema.pre('save', function(next){
    let message:any = this,
        date = new Date();
    if(!message.created){
        message.created = date;
    }
});

export default model('Message', MessageSchema);