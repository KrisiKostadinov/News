const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    post: {
        async login(req, res) {
            const { email, password } = req.body;

            if (email == '' || password == '') {
                return res.json({ error: 'The email and password is required!' });
            }

            const user = await User.findOne({ email });

            if (!user) {
                return res.json({ error: 'The email or password is wrong!' });
            }

            const isCompares = await bcrypt.compare(password, user.password);

            if (!isCompares) {
                return res.json({ error: 'The email or password is wrong!' });
            }

            const token = await jwt.sign({ user }, 'secret');

            res.json({
                token,
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        },

        async register(req, res) {
            const { fullname, email, password } = req.body;

            if (email == '' || password == '' || fullname == '') {
                return res.json({ error: 'The fullname, email and password is required!' });
            }

            const user = await User.findOne({ email });

            if (user) {
                return res.json({ error: 'This user already exists!' });
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const createdUser = await User.create({ fullname, email, password: passwordHash });

            res.json(createdUser);
        }
    }
}