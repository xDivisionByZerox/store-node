const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth/auth.controller');
const validatorHandler = require('../middleware/validator.handler');
const { loginSchema, registerSchema } = require('../schemas/user.schema');
const { adminAuth } = require('../middleware/auth.handler');
const { getProfile } = require('../controllers/users.controller');

const router = express.Router();

router.get('/', (req, res) => {
    const { limit, offset } = req.query;

    if (limit && offset) {
        res.json({
            limit,
            offset
        });
    } else {
        res.send('No hay params');
    }
});

router.post('/new', validatorHandler(registerSchema, 'body'), registerUser);
router.post('/login', validatorHandler(loginSchema, 'body'), loginUser);
router.get('/:username', adminAuth, getProfile)

module.exports = router;