const router = require('express').Router();
const { comment } = require('../controllers');

router.post('/add', comment.post.add);
router.post('/edit/:id', comment.post.edit);

router.delete('/delete/:id', comment.delete.byId);

module.exports = router;