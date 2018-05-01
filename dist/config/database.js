"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var databaseConfig = (function () {
    // mongo config - required
    var protocol = 'mongodb';
    var host = 'localhost';
    var port = '27017';
    var collection = 'plociuch';
    // mongo config - additional
    var username = '';
    var password = '';
    // getting full address
    var address = protocol + '://';
    if (username.length && password.length) {
        address += username + ':' + password + '@';
    }
    address += host + ':' + port + '/' + collection;
    return address;
})();
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.js.map