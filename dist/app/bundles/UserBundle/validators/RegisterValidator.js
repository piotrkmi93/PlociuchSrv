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
var RegisterValidator = /** @class */ (function (_super) {
    __extends(RegisterValidator, _super);
    function RegisterValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RegisterValidator.prototype.validator = function () {
        return {
            'password': 'required|string|min:6|max:32',
            'login': 'required|string|unique:users|min:3|max:32',
            'email': 'required|email|unique:users|max:255'
        };
    };
    return RegisterValidator;
}(CoreValidator_1.default));
exports.RegisterValidator = RegisterValidator;
//# sourceMappingURL=RegisterValidator.js.map