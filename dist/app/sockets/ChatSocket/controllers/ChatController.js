"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CoreSocketController_1 = require("../../../../vendor/controller/CoreSocketController");
var Message_1 = require("../../../bundles/ChatBundle/models/Message");
function sendToUser(UserId, connections, data) {
    var sockets = connections
        .filter(function (_a) {
        var userId = _a.userId;
        return userId === UserId;
    })
        .map(function (_a) {
        var connection = _a.connection;
        return connection;
    });
    for (var _i = 0, sockets_1 = sockets; _i < sockets_1.length; _i++) {
        var s = sockets_1[_i];
        s.emit('message', data);
        s.emit('message-menu', data);
    }
}
var ChatController = /** @class */ (function (_super) {
    __extends(ChatController, _super);
    function ChatController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatController.prototype.send = function (connection, connections, data) {
        var myCon = connections.find(function (c) { return c.connection === connection; });
        var myId = myCon.userId;
        Message_1.default.create({
            user: myId,
            conversation: data.conversationId,
            text: data.text
        }, function (err, success) {
            if (err) {
                throw err;
            }
            else {
                console.log('message created');
                var message = {
                    text: data.text,
                    created: (new Date(success.created)).getTime(),
                    conversation: data.conversationId,
                    user: myId
                };
                sendToUser(data.userId, connections, message);
                sendToUser(myId, connections, message);
            }
        });
    };
    ChatController.prototype.conversation = function (connection, connections, data) {
        Message_1.default.find({
            conversation: data.conversationId
        }, function (err, messages) {
            if (err)
                throw err;
            connection.emit('conversation', messages);
        });
    };
    return ChatController;
}(CoreSocketController_1.default));
exports.ChatController = ChatController;
//# sourceMappingURL=ChatController.js.map