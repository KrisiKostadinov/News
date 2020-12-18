const router = require('express').Router();
const { comment } = require('../controllers');

router.post('/add', comment.post.add);
router.post('/edit/:id', comment.post.edit);
router.post('/like/:id', comment.post.like);

router.delete('/delete/:id', comment.delete.byId);
router.delete('/dislike/:id', comment.delete.dislike);

module.exports = router;