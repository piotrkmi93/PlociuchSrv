"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateRandomString = function (length) {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    var randomString = "";
    for (var i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomString;
};
exports.default = generateRandomString;
//# sourceMappingURL=generateRandomString.js.map