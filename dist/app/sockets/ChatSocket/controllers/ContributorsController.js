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
var Conversation_1 = require("../../../bundles/ChatBundle/models/Conversation");
var User_1 = require("../../../bundles/UserBundle/models/User");
var ContributorsController = /** @class */ (function (_super) {
    __extends(ContributorsController, _super);
    function ContributorsController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContributorsController.prototype.all = function (connection, connections, data) {
        var contributors = [];
        var myCon = connections.find(function (c) { return c.connection === connection; });
        var myId = myCon.userId;
        var cmongo = {
            $or: [
                { one: myId },
                { two: myId }
            ]
        };
        Conversation_1.default.find(cmongo, function (err, conversations) {
            var _loop_1 = function (conversation) {
                var idx = contributors.findIndex(function (_a) {
                    var conversationId = _a.conversationId;
                    return conversationId === conversation._id;
                });
                if (idx === -1) {
                    var contributor = {
                        conversationId: conversation._id.toString(),
                        user: {
                            id: conversation.one.toString() === myId
                                ? conversation.two.toString()
                                : conversation.one.toString()
                        },
                        lastMessage: {
                            text: undefined,
                            date: undefined
                        },
                        unreadMessages: 0
                    };
                    contributors.push(contributor);
                }
            };
            for (var _i = 0, conversations_1 = conversations; _i < conversations_1.length; _i++) {
                var conversation = conversations_1[_i];
                _loop_1(conversation);
            }
            var umongo = {
                _id: { $in: contributors.map(function (_a) {
                        var user = _a.user;
                        return user.id;
                    }) }
            };
            User_1.default.find(umongo, function (err, users) {
                var _loop_2 = function (u) {
                    var idx = contributors.findIndex(function (_a) {
                        var user = _a.user;
                        return user.id === u.id;
                    });
                    if (idx !== -1) {
                        contributors[idx].user.login = u.login;
                    }
                };
                for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                    var u = users_1[_i];
                    _loop_2(u);
                }
                // Message.aggregate([
                //     {
                //         $match: {
                //             conversation: { $in: contributors.map(({conversationId}) => conversationId) },
                //             user: { $nin: [myId] }
                //         }
                //     },
                //     {
                //         $group: {
                //             _id: null,
                //             count: { $sum: 1 }
                //         }
                //     }
                // ]).then(result => {
                //
                //     console.log(result);
                //
                // });
                // const mmongo = {
                //     conversation: { $in: contributors.map(({conversationId}) => conversationId) },
                //     user
                // };
                // Message.find()
                // todo messages
                // todo count unread messages
                // todo get last message
                console.log('wololo');
                connection.emit('contributors', contributors);
            });
        });
    };
    return ContributorsController;
}(CoreSocketController_1.default));
exports.ContributorsController = ContributorsController;
//# sourceMappingURL=ContributorsController.js.map