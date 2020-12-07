const moongose = require('mongoose');

const userSchema = new moongose.Schema({
    name: {
        type: String,
        lowercase: true,
    },
    surname: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const User = moongose.model('User', userSchema);

module.exports = User;