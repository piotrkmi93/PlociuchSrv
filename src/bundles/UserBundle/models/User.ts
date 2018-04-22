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
    }

});

UserSchema.pre('save', function(next) {
    let user:any = this,
        date:Date = new Date();
    user.updated = date;
    if(!user.created) {
        user.created = date;
        genSalt(10, (err, salt) => hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        }));
    }
});

UserSchema.methods.compare = function (password) {
    return compareSync(password, this.password);
};

export default model('User', UserSchema);