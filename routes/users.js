const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth/auth.controller');
const validatorHandler = require('../middleware/validator.handler');
const { loginSchema } = require('../schemas/user.schema');

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

router.post('/new', registerUser);
router.get('/login', validatorHandler(loginSchema, 'body'), loginUser);

module.exports = router;