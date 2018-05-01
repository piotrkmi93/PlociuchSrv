"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mergeRequestData = function (request) {
    var all = {};
    for (var prop in request.body) {
        all[prop] = request.body[prop];
    }
    for (var prop in request.params) {
        all[prop] = request.params[prop];
    }
    for (var prop in request.query) {
        all[prop] = request.query[prop];
    }
    return all;
};
exports.default = mergeRequestData;
//# sourceMappingURL=mergeRequestData.js.map