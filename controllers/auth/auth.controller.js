const boom = require('@hapi/boom');
const Mongoose = require('mongoose');
const User = require('../../db/schema/user');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');


const registerUser = async (req, res, next) => {
    const { name, username, password } = req.body;

    try {
        const hashedPassword = await hash(password, 10);
        const user = await User.create({
            name, username, password: hashedPassword
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
        const user = await User.findOne({ username });
        if (!user) {
            throw next(boom.unauthorized('Invalid credentials'));
        }

        const isAuthorized = await compare(password, user.password);
        if (!isAuthorized) {
            throw next(boom.unauthorized('Invalid credentials'));
        }

        const MAX_AGE = 3 * 60 * 60; // 3 hours in sec
        const _SERVER_PASSWORD = require('./../../__security/secret.json');
        const userResponse = { username: user.username, name: user.name, _id: user._id };
        const token = sign(
            userResponse,
            _SERVER_PASSWORD.token,
            { expiresIn: MAX_AGE }
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: MAX_AGE * 1000 //ms
        })

        res.status(200).json(userResponse);
    } catch(err) {
        next(err);
    }
};


module.exports = {
    registerUser,
    loginUser
};
