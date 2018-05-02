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
var CoreController_1 = require("../../../../vendor/controller/CoreController");
var generateRandomString_1 = require("../../../../vendor/helpers/generateRandomString");
var User_1 = require("../models/User");
var CoreMailer_1 = require("../../../../vendor/mailer/CoreMailer");
var createToken_1 = require("../../../../vendor/helpers/createToken");
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Register new account
     *
     * @param {e.Request} request
     * @param {e.Response} response
     */
    UserController.prototype.register = function (request, response) {
        this.create(request.body.login, request.body.email, request.body.password, request, response);
    };
    /**
     * Checks is credentials correct and creates the token
     *
     * @param {e.Request} request
     * @param {e.Response} response
     */
    UserController.prototype.login = function (request, response) {
        User_1.default.findOne({ login: request.body.login }, function (err, user) {
            if (err)
                throw err;
            if (user.is_active) {
                var correct = user.compare(request.body.password);
                if (correct) {
                    createToken_1.default(user, function (token) {
                        response.send({ token: token });
                    });
                }
                else {
                    response.status(409);
                    response.send(['Password is not correct']);
                }
            }
            else {
                response.status(405);
                response.send(['This account is not activated']);
            }
        });
    };
    UserController.prototype.logout = function (request, response) {
        // todo
    };
    /**
     * Account activation, return success or failure view
     *
     * @param {e.Request} request
     * @param {e.Response} response
     */
    UserController.prototype.activate = function (request, response) {
        var activationCode = request.params.activationCode;
        var msg = '';
        User_1.default.findOne({ activation_code: activationCode }, function (err, user) {
            if (err)
                throw err;
            if (!user || !user.activation_code) {
                msg = 'User is not exists or already activated';
                response.render('user/activation', {
                    msg: msg
                });
            }
            else {
                console.log(user);
                user.activation_code = undefined;
                user.is_active = true;
                user.save(function (err) {
                    if (err) {
                        msg = 'Cannot activate your account!';
                    }
                    else {
                        msg = 'Your account has been successfully activated!';
                    }
                    response.render('user/activation', {
                        msg: msg
                    });
                });
            }
        });
    };
    /**
     * Creates a new user and sends him an email
     *
     * @param {string} login
     * @param {string} email
     * @param {string} password
     * @param {e.Request} request
     * @param {e.Response} response
     */
    UserController.prototype.create = function (login, email, password, request, response) {
        var _this = this;
        var activationCode = generateRandomString_1.default(30);
        User_1.default.create({
            login: login,
            email: email,
            password: password,
            activation_code: activationCode
        }).then(function (user) {
            _this.sendActivationMail(user, activationCode, request, response);
        }).catch(function (failure) {
            response.send({
                reason: failure,
                success: false
            });
        });
    };
    /**
     * Send activation email to given address
     *
     * @param user
     * @param {string} activationCode
     * @param {e.Request} request
     * @param {e.Response} response
     */
    UserController.prototype.sendActivationMail = function (user, activationCode, request, response) {
        var coreMailer = new CoreMailer_1.default();
        var link = request.headers.host + '/user/activate/' + activationCode;
        coreMailer.send(user.email, 'New account activation', "<p>Activation link for " + user.login + " is <a href=\"" + link + "\">" + link + "</a>")
            .then(function (success) {
            response.send({
                success: true
            });
        })
            .catch(function (failure) {
            user.remove();
            response.send({
                reason: failure,
                success: false
            });
        });
    };
    return UserController;
}(CoreController_1.default));
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map