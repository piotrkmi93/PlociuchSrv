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
var CoreRouter_1 = require("../../../../vendor/router/CoreRouter");
var UserRouter = /** @class */ (function (_super) {
    __extends(UserRouter, _super);
    function UserRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserRouter.prototype.routes = function () {
        // api
        this.post('/register', 'UserController@register', 'RegisterValidator');
        this.post('/login', 'UserController@login', 'LoginValidator');
        // normal
        this.get('/activate/:activationCode', 'UserController@activate');
    };
    return UserRouter;
}(CoreRouter_1.default));
exports.UserRouter = UserRouter;
//# sourceMappingURL=UserRouter.js.map