const router = require('express').Router();
const { post } = require('../controllers');

router.get('/', post.get.all);
router.get('/details/:id', post.get.byId);
router.get('/edit/:id', post.get.edit);

router.post('/add', post.post.add);
router.post('/edit/:id', post.post.edit);

router.delete('/edit/:id', post.delete.byId);

module.exports = router;