const router = require('express').Router();
const { user } = require('../controllers');

router.post('/login', user.post.login);
router.post('/register', user.post.register);

module.exports = router;