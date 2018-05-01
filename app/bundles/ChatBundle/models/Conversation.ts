import { Schema, model } from 'mongoose';

const ConversationSchema: Schema = new Schema({

    one: Schema.Types.ObjectId,
    two: Schema.Types.ObjectId

});

export default model('Conversation', ConversationSchema);