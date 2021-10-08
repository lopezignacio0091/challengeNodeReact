const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const auth = require('../middleware/auth');



//@route GET api/auth
//@desc get logged user
//@access Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

    //res.send('get loggin user');
});

//@route POST api/auth
//@desc auth user
//@access Public
router.post('/', [
    check('email', 'Please introduce a correct email').isEmail(),
    check('password', 'Password is require').exists()
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                email:user.email
            }
        }

        //agrgeamos devolucion de token con expiracion
        jwt.sign(payload,
            config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token,user });
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

    //res.send('logg in user');
});

module.exports = router;