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
var SearchEngineController = /** @class */ (function (_super) {
    __extends(SearchEngineController, _super);
    function SearchEngineController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Searches contributors by phrase
     *
     * @param connection
     * @param connections
     * @param data
     */
    SearchEngineController.prototype.search = function (connection, connections, data) {
        var myCon = connections.find(function (c) { return c.connection === connection; });
        var myId = myCon.userId;
        var cmongo = {
            $or: [
                { one: myId },
                { two: myId }
            ]
        };
        Conversation_1.default.find(cmongo, function (err, cons) {
            var in_cons = [];
            for (var _i = 0, cons_1 = cons; _i < cons_1.length; _i++) {
                var con = cons_1[_i];
                if (con.one.toString() === myId)
                    in_cons.push(con.two.toString());
                else
                    in_cons.push(con.one.toString());
            }
            var umongo = {
                login: { $regex: '.*' + data.phrase + '.*' },
                _id: { $nin: [myId] },
                is_active: true
            };
            User_1.default.find(umongo, function (err, users) {
                connection.emit('search-result', users.map(function (user) {
                    return {
                        id: user.id,
                        login: user.login,
                        in_contributors: in_cons.indexOf(user.id) !== -1
                    };
                }));
            });
        });
    };
    /**
     * Creating new conversation
     *
     * @param connection
     * @param connections
     * @param data
     */
    SearchEngineController.prototype.add = function (connection, connections, data) {
        var myCon = connections.find(function (c) { return c.connection === connection; });
        var myId = myCon.userId;
        Conversation_1.default.create({
            one: myId,
            two: data.userId
        }).then(function (con) {
            connection.emit('add-contributor-success');
        }).catch(function (failure) {
            connection.emit('add-contributor-failed');
        });
    };
    return SearchEngineController;
}(CoreSocketController_1.default));
exports.SearchEngineController = SearchEngineController;
//# sourceMappingURL=SearchEngineController.js.map