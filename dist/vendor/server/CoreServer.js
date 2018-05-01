"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var compression = require("compression");
var logger = require("morgan");
var helmet = require("helmet");
var cors = require("cors");
var database_1 = require("../../config/database");
var CoreServer = /** @class */ (function () {
    function CoreServer() {
        this.isSocket = false;
        this.MONGO_URI = database_1.databaseConfig;
        console.log('building server');
        this.app = express();
        this.config();
    }
    CoreServer.prototype.config = function () {
        // db connection
        mongoose.connect(this.MONGO_URI || process.env.MONGODB_URI);
        // config
        this.app.set('view engine', 'pug');
        this.app.use(express.static('public'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    };
    CoreServer.prototype.getApp = function () {
        return this.app;
    };
    return CoreServer;
}());
exports.default = CoreServer;
//# sourceMappingURL=CoreServer.js.map