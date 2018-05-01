"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CoreRouter = /** @class */ (function () {
    function CoreRouter(bundle) {
        this.controllersCache = {};
        this.validatorsCache = {};
        this.bundle = bundle;
        this.router = express_1.Router();
    }
    CoreRouter.prototype.routes = function () { };
    CoreRouter.getRouter = function (bundle) {
        var router = new this(bundle);
        router.routes();
        return router.router;
    };
    CoreRouter.prototype.get = function (path, actionName, validatorName) {
        if (validatorName === void 0) { validatorName = undefined; }
        this.createRoute('get', path, actionName, validatorName);
    };
    CoreRouter.prototype.post = function (path, actionName, validatorName) {
        if (validatorName === void 0) { validatorName = undefined; }
        this.createRoute('post', path, actionName, validatorName);
    };
    CoreRouter.prototype.put = function (path, actionName, validatorName) {
        if (validatorName === void 0) { validatorName = undefined; }
        this.createRoute('put', path, actionName, validatorName);
    };
    CoreRouter.prototype.delete = function (path, actionName, validatorName) {
        if (validatorName === void 0) { validatorName = undefined; }
        this.createRoute('delete', path, actionName, validatorName);
    };
    CoreRouter.prototype.createRoute = function (method, path, actionName, validatorName) {
        if (validatorName === void 0) { validatorName = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var controllerName, validator, controller, importedValidator, importedController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controllerName = actionName.slice(0, actionName.indexOf('@'));
                        actionName = actionName.replace(controllerName + '@', '');
                        validator = undefined, controller = undefined;
                        if (!(typeof validatorName !== 'undefined')) return [3 /*break*/, 3];
                        if (!(typeof this.validatorsCache[validatorName] !== 'undefined')) return [3 /*break*/, 1];
                        validator = this.validatorsCache[validatorName];
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../app/bundles/' + _this.bundle + '/validators/' + validatorName); })];
                    case 2:
                        importedValidator = _a.sent();
                        validator = new importedValidator[validatorName]();
                        this.validatorsCache[validatorName] = validator;
                        _a.label = 3;
                    case 3:
                        if (!(typeof this.controllersCache[controllerName] !== 'undefined')) return [3 /*break*/, 4];
                        controller = this.controllersCache[controllerName];
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, Promise.resolve().then(function () { return require('../../app/bundles/' + _this.bundle + '/controllers/' + controllerName); })];
                    case 5:
                        importedController = _a.sent();
                        controller = new importedController[controllerName]();
                        this.controllersCache[controllerName] = controller;
                        _a.label = 6;
                    case 6:
                        this.router[method](path, function (rq, rs, nx) {
                            if (typeof validator !== 'undefined') {
                                validator.validate(rq, rs, nx);
                            }
                            else {
                                controller[actionName](rq, rs);
                            }
                        }, function (rq, rs) {
                            controller[actionName](rq, rs);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return CoreRouter;
}());
exports.default = CoreRouter;
//# sourceMappingURL=CoreRouter.js.map