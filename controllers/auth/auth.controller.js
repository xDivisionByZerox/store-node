const boom = require('@hapi/boom');
const Mongoose = require('mongoose');
const User = require('../../db/schema/user');


const registerUser = async (req, res, next) => {
    const { name, username, password } = req.body;

    if (!password || password.length < 6) {
        throw next(boom.badRequest('The password must contain more than 6 characters'));
    }

    try {
        const user = await User.create({
            name, username, password
        });

        res.status(200).json({
            message: 'User Created',
            user
        });
    } catch (err) {
        next(err);
    }
};

const loginUser = async(req, res, next) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            throw next(boom.unauthorized('Invalid credentials'));
        }

        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
};


module.exports = {
    registerUser,
    loginUser
};
