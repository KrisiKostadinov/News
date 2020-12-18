const router = require('express').Router();
const { category } = require('../controllers');

router.get('/all', category.get.all);
router.get('/details/:id', category.get.byId);
router.get('/edit/:id', category.get.edit);

router.post('/add', category.post.add);
router.post('/edit/:id', category.post.edit);

router.delete('/edit/:id', category.delete.byId);

module.exports = router;