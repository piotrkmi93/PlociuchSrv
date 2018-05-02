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
var SearchEngineSocket = /** @class */ (function (_super) {
    __extends(SearchEngineSocket, _super);
    function SearchEngineSocket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchEngineSocket.init = function () {
        this.on('search', 'SearchEngineController@search');
        this.on('add-contributor', 'SearchEngineController@add');
    };
    return SearchEngineSocket;
}(CoreSocket_1.default));
exports.default = SearchEngineSocket;
//# sourceMappingURL=SearchEngineSocket.js.map