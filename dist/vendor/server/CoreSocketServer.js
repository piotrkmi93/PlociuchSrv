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
var CoreServer_1 = require("./CoreServer");
var SocketIO = require("socket.io");
var verifyToken_1 = require("../helpers/verifyToken");
var CoreSocketServer = /** @class */ (function (_super) {
    __extends(CoreSocketServer, _super);
    function CoreSocketServer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isSocket = true;
        return _this;
    }
    CoreSocketServer.prototype.listen = function (server) {
        var _this = this;
        this.socketServer = SocketIO.listen(server);
        console.log('Socket Server started');
        this.socketServer.sockets.on('connection', function (connection) {
            console.log('connected');
            CoreSocketServer.connections.push({ connection: connection });
            for (var _i = 0, _a = CoreSocketServer.handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                _this.setHandler(handler, connection);
            }
            connection.on('attach-user', function (token) { return _this.attachUser(connection, token); });
            connection.on('disconnect', function () {
                var idx = CoreSocketServer.connections.findIndex(function (c) { return c.connection === connection; });
                if (idx !== -1) {
                    console.log('disconnected');
                    CoreSocketServer.connections.splice(idx, 1);
                }
            });
        });
    };
    CoreSocketServer.prototype.setHandler = function (handler, connection) {
        connection.on(handler.event, function (data) {
            if (typeof data.token !== 'undefined') {
                verifyToken_1.default(data.token, function (valid) {
                    if (valid) {
                        handler.action(connection, CoreSocketServer.connections, data);
                    }
                    else {
                        connection.emit('invalid-token');
                    }
                });
            }
            else {
                handler.action(connection, CoreSocketServer.connections, data);
            }
        });
    };
    CoreSocketServer.prototype.attachUser = function (connection, token) {
        verifyToken_1.default(token, function (decoded) {
            if (typeof decoded !== 'undefined') {
                var idx = CoreSocketServer.connections.findIndex(function (c) { return c.connection === connection; });
                if (idx !== -1) {
                    console.log('attached');
                    CoreSocketServer.connections[idx].userId = decoded.user._id;
                }
                else {
                    connection.emit('invalid-token');
                }
            }
            else {
                connection.emit('invalid-token');
            }
        }, true);
    };
    CoreSocketServer.pinHandler = function (event, action) {
        this.handlers.push({
            event: event, action: action
        });
    };
    CoreSocketServer.connections = [];
    CoreSocketServer.handlers = [];
    return CoreSocketServer;
}(CoreServer_1.default));
exports.default = CoreSocketServer;
//# sourceMappingURL=CoreSocketServer.js.map