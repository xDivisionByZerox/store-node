const boom = require("@hapi/boom");
const { verify } = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    const token = req && req.cookies && req.cookies.jwt;
    try {
        if (!token) {
            throw boom.unauthorized('Unauthorized');
        }

        const _SERVER_PASSWORD = require('./../__security/secret.json');
        verify(token, _SERVER_PASSWORD.token, (err) => {
            if (err) {
                throw boom.unauthorized('Unauthorized');
            }

            res.set({
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
                "Surrogate-Control": "no-store"
              });
            next();
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { adminAuth };