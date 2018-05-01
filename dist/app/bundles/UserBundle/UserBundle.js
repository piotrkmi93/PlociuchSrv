"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRouter_1 = require("./routers/UserRouter");
var UserBundle = /** @class */ (function () {
    function UserBundle() {
    }
    UserBundle.init = function (app) {
        app.use('/user/', UserRouter_1.default.getRouter(this.name));
    };
    return UserBundle;
}());
exports.default = UserBundle;
//# sourceMappingURL=UserBundle.js.map