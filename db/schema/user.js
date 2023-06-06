const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        default: 'Default',
        required: true
    }
});

const User = Mongoose.model('user', UserSchema);
module.exports = User;