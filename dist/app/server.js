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
// import CoreServer from "../vendor/server/CoreServer";
var CoreSocketServer_1 = require("../vendor/server/CoreSocketServer");
// import bundles
var UserBundle_1 = require("./bundles/UserBundle/UserBundle");
// import sockets
var SearchEngineSocket_1 = require("./sockets/SearchEngineSocket/SearchEngineSocket");
var ChatSocket_1 = require("./sockets/ChatSocket/ChatSocket");
// server
var Server = /** @class */ (function (_super) {
    __extends(Server, _super);
    function Server() {
        var _this = _super.call(this) || this;
        _this.bundles();
        _this.isSocket && _this.sockets();
        return _this;
    }
    // connect your bundles
    Server.prototype.bundles = function () {
        UserBundle_1.default.init(this.app);
    };
    // connect your sockets
    Server.prototype.sockets = function () {
        SearchEngineSocket_1.default.init();
        ChatSocket_1.default.init();
    };
    return Server;
}(CoreSocketServer_1.default));
exports.default = Server;
//# sourceMappingURL=server.js.map