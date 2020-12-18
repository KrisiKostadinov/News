const router = require('express').Router();
const { post } = require('../controllers');

router.get('/all', post.get.all);
router.get('/details/:id', post.get.byId);
router.get('/edit/:id', post.get.edit);

router.post('/add', post.post.add);
router.post('/edit/:id', post.post.edit);
router.post('/like/:id', post.post.like);
router.post('/dislike/:id', post.post.dislike);
router.post('/lock-comments/:id', post.post.lockComments);
router.post('/unlock-comments/:id', post.post.unLockComments);

router.delete('/delete/:id', post.delete.byId);
router.delete('/delete/all-comments/:postId', post.delete.allComments);

module.exports = router;