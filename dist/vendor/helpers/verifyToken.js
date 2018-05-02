"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JWT = require("jsonwebtoken");
var jwt_1 = require("../../config/jwt");
var verifyToken = function (token, callback, full) {
    if (full === void 0) { full = false; }
    JWT.verify(token, jwt_1.default.secret, function (err, decoded) {
        if (err)
            throw err;
        callback(full ? decoded : decoded !== 'undefined');
    });
};
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map