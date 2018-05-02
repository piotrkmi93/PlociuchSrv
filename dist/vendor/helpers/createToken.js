"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JWT = require("jsonwebtoken");
var jwt_1 = require("../../config/jwt");
var createToken = function (user, callback) {
    var _user = {
        id: user.id,
        login: user.login
    };
    JWT.sign({ _user: _user }, jwt_1.default.secret, function (err, token) {
        if (err)
            throw err;
        callback(token);
    });
};
exports.default = createToken;
//# sourceMappingURL=createToken.js.map