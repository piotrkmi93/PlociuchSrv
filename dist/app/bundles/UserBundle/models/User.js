"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt = require("bcrypt");
var UserSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    updated: {
        type: Date
    },
    login: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: '',
        required: true
    },
    activation_code: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: false
    }
});
UserSchema.pre('save', function (next) {
    var user = this, date = new Date();
    user.updated = date;
    if (!user.created) {
        console.log('saving created');
        user.created = date;
        bcrypt.genSalt(10, function (err, salt) { return bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        }); });
    }
    else {
        next();
    }
});
UserSchema.methods.compare = function (password) {
    return bcrypt.compareSync(password, this.password);
};
exports.default = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=User.js.map