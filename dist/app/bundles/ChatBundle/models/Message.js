"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MessageSchema = new mongoose_1.Schema({
    conversation: mongoose_1.Schema.Types.ObjectId,
    user: mongoose_1.Schema.Types.ObjectId,
    text: String,
    created: Date
});
MessageSchema.pre('save', function (next) {
    var message = this, date = new Date();
    if (!message.created) {
        message.created = date;
    }
    next();
});
exports.default = mongoose_1.model('Message', MessageSchema);
//# sourceMappingURL=Message.js.map