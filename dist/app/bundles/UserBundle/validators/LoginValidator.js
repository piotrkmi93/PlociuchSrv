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
var CoreValidator_1 = require("../../../../vendor/validator/CoreValidator");
var LoginValidator = /** @class */ (function (_super) {
    __extends(LoginValidator, _super);
    function LoginValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginValidator.prototype.validator = function () {
        return {
            'password': 'required|string|min:6|max:32',
            'login': 'required|string|exists:users|min:3|max:32'
        };
    };
    return LoginValidator;
}(CoreValidator_1.default));
exports.LoginValidator = LoginValidator;
//# sourceMappingURL=LoginValidator.js.map