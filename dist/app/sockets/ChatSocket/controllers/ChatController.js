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
var ChatController = /** @class */ (function (_super) {
    __extends(ChatController, _super);
    function ChatController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatController.prototype.send = function (connection, connections, data) {
        var _this = this;
        var myCon = connections.find(function (c) { return c.connection === connection; });
        var myId = myCon.userId;
        Message_1.default.create({
            user: myId,
            conversation: data.conversationId,
            text: data.text
        }).then(function (success) {
            connection.emit('send-success');
            _this.sendToUser(data.userId, connections, {
                text: data.text,
                date: success.created,
                user: myId
            });
        }).catch(function (failure) {
            connection.emit('send-failure');
        });
    };
    ChatController.prototype.read = function (connection, connections, data) {
        var read = new Date();
        Message_1.default.updateMany({ _id: { $in: data.messagesIds } }, { $set: { read: read } }).then(function (success) {
            connection.emit('read-success');
        }).catch(function (failure) {
            connection.emit('read-failure');
        });
    };
    ChatController.prototype.conversation = function (connection, connections, data) {
        // todo
    };
    ChatController.prototype.sendToUser = function (UserId, connections, data) {
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
        }
    };
    return ChatController;
}(CoreSocketController_1.default));
exports.ChatController = ChatController;
//# sourceMappingURL=ChatController.js.map