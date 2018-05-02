"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ConversationSchema = new mongoose_1.Schema({
    one: mongoose_1.Schema.Types.ObjectId,
    two: mongoose_1.Schema.Types.ObjectId
});
exports.default = mongoose_1.model('Conversation', ConversationSchema);
//# sourceMappingURL=Conversation.js.map