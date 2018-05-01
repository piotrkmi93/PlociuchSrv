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
var CoreSocketServer = /** @class */ (function (_super) {
    __extends(CoreSocketServer, _super);
    function CoreSocketServer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isSocket = true;
        _this.connections = [];
        return _this;
    }
    CoreSocketServer.prototype.listen = function (server) {
        var _this = this;
        this.socketServer = SocketIO.listen(server);
        console.log('Socket Server started');
        this.socketServer.sockets.on('connection', function (connection) {
            console.log('connected');
            _this.connections.push(connection);
            connection.on('disconnect', function () {
                var idx = _this.connections.indexOf(connection);
                if (idx !== -1) {
                    console.log('disconnected');
                    _this.connections.splice(idx, 1);
                }
            });
        });
    };
    return CoreSocketServer;
}(CoreServer_1.default));
exports.default = CoreSocketServer;
//# sourceMappingURL=CoreSocketServer.js.map