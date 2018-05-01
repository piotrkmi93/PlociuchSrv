"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mergeRequestData_1 = require("../helpers/mergeRequestData");
var CoreValidator = /** @class */ (function () {
    function CoreValidator() {
        /**
         * Email regex
         *
         * @type {RegExp}
         */
        this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    /**
     *
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {e.NextFunction} next
     */
    CoreValidator.prototype.validate = function (request, response, next) {
        // array of objects
        var props = this.makePropsArray(this.validator());
        // object with properties
        // let requestData = this.getAllFromRequest( request );
        var requestData = mergeRequestData_1.default(request);
        var errors = [];
        console.log(props);
        this.checkNextProp(errors, props, requestData, function () {
            // todo more code handlers
            if (errors.length) {
                response.status(409);
                response.send(errors);
            }
            else {
                next();
            }
        });
    };
    ;
    CoreValidator.prototype.checkNextProp = function (errors, props, requestData, callback, index) {
        var _this = this;
        if (index === void 0) { index = 0; }
        var prop = props[index];
        if (typeof prop !== 'undefined') {
            var field = requestData[prop.field];
            if (typeof field !== 'undefined') {
                if (prop.type === 'string' || prop.type === 'email') {
                    if (typeof field === 'string') {
                        if (prop.type === 'email' && !field.match(this.emailRegex)) {
                            errors.push(prop.field + " is not an email");
                        }
                        if (typeof prop.min === 'number' && field.length < prop.min) {
                            errors.push(prop.field + " is too short (at leas " + prop.min + " characters)");
                        }
                        if (typeof prop.max === 'number' && field.length > prop.max) {
                            errors.push(prop.field + " is too long (max " + prop.max + " characters)");
                        }
                    }
                    else {
                        errors.push(prop.field + " is not a string");
                    }
                }
                if (prop.unique || prop.exists) {
                    this.findInDatabase(prop, prop.field, field, function (exists) {
                        if (prop.unique && exists) {
                            errors.push(prop.field + " already exists");
                        }
                        if (prop.exists && !exists) {
                            errors.push(prop.field + " not exists");
                        }
                        _this.checkNextProp(errors, props, requestData, callback, index + 1);
                    });
                }
                else {
                    this.checkNextProp(errors, props, requestData, callback, index + 1);
                }
            }
            else {
                if (prop.required) {
                    errors.push(prop.field + " is required");
                }
                this.checkNextProp(errors, props, requestData, callback, index + 1);
            }
        }
        else {
            callback();
        }
    };
    CoreValidator.prototype.findInDatabase = function (prop, name, field, callback) {
        var query = {};
        query[name] = field;
        var collection = prop.unique || prop.exists;
        mongoose_1.connection.collection(collection).find(query).toArray(function (err, results) {
            callback(results.length);
        });
    };
    CoreValidator.prototype.makePropsArray = function (props) {
        var newProps = [];
        for (var name_1 in props) {
            var newProp = {
                field: name_1
            };
            if (props[name_1].indexOf('required') !== -1) {
                newProp.required = true;
            }
            if (props[name_1].indexOf('string') !== -1) {
                newProp.type = 'string';
            }
            if (props[name_1].indexOf('email') !== -1) {
                newProp.type = 'email';
            }
            if (props[name_1].indexOf('min:') !== -1) {
                newProp.min = Number(this.getValue(props[name_1], 'min:'));
            }
            if (props[name_1].indexOf('max:') !== -1) {
                newProp.max = Number(this.getValue(props[name_1], 'max:'));
            }
            if (props[name_1].indexOf('unique:') !== -1) {
                newProp.unique = this.getValue(props[name_1], 'unique:');
            }
            if (props[name_1].indexOf('exists:') !== -1) {
                newProp.exists = this.getValue(props[name_1], 'exists:');
            }
            newProps.push(newProp);
            // todo more
        }
        return newProps;
    };
    CoreValidator.prototype.getValue = function (prop, name) {
        var tmp1 = prop.substring(prop.indexOf(name));
        var tmp2 = tmp1.indexOf('|');
        return tmp1.substring(name.length, tmp2 > -1 ? tmp2 : undefined);
    };
    return CoreValidator;
}());
exports.default = CoreValidator;
//# sourceMappingURL=CoreValidator.js.map