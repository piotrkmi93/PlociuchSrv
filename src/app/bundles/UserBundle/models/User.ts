import { Schema, model } from 'mongoose';
import { genSalt, hash, compareSync } from "bcrypt";

const UserSchema: Schema = new Schema({

    created: {
        type: Date,
        default: Date.now
    },

    updated: {
        type: Date,
        default: Date.now
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

UserSchema.pre('save', function(next) {
    let user:any = this;

    genSalt(10)
        .then(hash => {
            console.log(hash);
            user.password = hash;
            next();
        })
        .catch(error => {
            console.log(error);
        });
});

UserSchema.methods.compare = function (password) {
    return compareSync(password, this.password);
};

export default model('User', UserSchema);