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
var CoreSocket_1 = require("../../../vendor/socket/CoreSocket");
var ChatSocket = /** @class */ (function (_super) {
    __extends(ChatSocket, _super);
    function ChatSocket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatSocket.init = function () {
        this.on('contributors', 'ContributorsController@all');
    };
    return ChatSocket;
}(CoreSocket_1.default));
exports.default = ChatSocket;
//# sourceMappingURL=ChatSocket.js.map