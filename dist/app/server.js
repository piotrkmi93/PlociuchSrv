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
// import bundles
var UserBundle_1 = require("./bundles/UserBundle/UserBundle");
var CoreSocketServer_1 = require("../vendor/server/CoreSocketServer");
// server
var Server = /** @class */ (function (_super) {
    __extends(Server, _super);
    function Server() {
        var _this = _super.call(this) || this;
        _this.bundles();
        return _this;
    }
    // connect your bundles
    Server.prototype.bundles = function () {
        UserBundle_1.default.init(this.app);
    };
    return Server;
}(CoreSocketServer_1.default));
exports.default = Server;
//# sourceMappingURL=server.js.map