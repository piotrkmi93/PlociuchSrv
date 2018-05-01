import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema({

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

UserSchema.pre('save', function(next) {
    let user:any = this, date: Date = new Date();
    user.updated = date;
    if(!user.created) {
        console.log('saving created');
        user.created = date;
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        }));
    } else {
        next();
    }

});

UserSchema.methods.compare = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export default model('User', UserSchema);